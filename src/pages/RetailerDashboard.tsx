import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Shield, CheckCircle2, XCircle, Clock, Scan, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock customer data
const mockCustomers = {
  "RV-2024-001234": {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    id: "RV-2024-001234",
    trustScore: "High",
    totalPurchases: 47,
    successfulReturns: 12,
    failedReturns: 1,
    avgOrderValue: 127.50,
    lastPurchase: "2024-01-10",
    riskFactors: [],
    recentActivity: [
      { date: "2024-01-10", type: "purchase", amount: 89.99, item: "Wireless Headphones" },
      { date: "2024-01-08", type: "return", amount: 45.50, item: "Phone Case", status: "approved" },
      { date: "2024-01-05", type: "purchase", amount: 199.99, item: "Smart Watch" },
    ]
  },
  "RV-2024-005678": {
    name: "Mike Chen",
    email: "mike.chen@email.com", 
    id: "RV-2024-005678",
    trustScore: "Medium",
    totalPurchases: 23,
    successfulReturns: 8,
    failedReturns: 3,
    avgOrderValue: 85.20,
    lastPurchase: "2024-01-12",
    riskFactors: ["High return rate", "Multiple failed returns"],
    recentActivity: [
      { date: "2024-01-12", type: "return", amount: 120.00, item: "Bluetooth Speaker", status: "pending" },
      { date: "2024-01-11", type: "purchase", amount: 75.99, item: "Gaming Mouse" },
      { date: "2024-01-09", type: "return", amount: 89.99, item: "Keyboard", status: "rejected" },
    ]
  }
};

const RetailerDashboard = () => {
  const [searchId, setSearchId] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    const customer = mockCustomers[searchId as keyof typeof mockCustomers];
    if (customer) {
      setSelectedCustomer(customer);
      toast({
        title: "Customer Found",
        description: `Loaded profile for ${customer.name}`,
      });
    } else {
      toast({
        title: "Customer Not Found",
        description: "Please check the ID and try again",
        variant: "destructive",
      });
    }
  };

  const handleScanQR = () => {
    setIsScanning(true);
    // Simulate QR scan
    setTimeout(() => {
      setIsScanning(false);
      setSearchId("RV-2024-001234");
      setSelectedCustomer(mockCustomers["RV-2024-001234"]);
      toast({
        title: "QR Code Scanned",
        description: "Customer identity verified via QR code",
      });
    }, 2000);
  };

  const handleReturnDecision = (approve: boolean) => {
    const action = approve ? "approved" : "rejected";
    toast({
      title: `Return ${action.charAt(0).toUpperCase() + action.slice(1)}`,
      description: `Return request has been ${action}`,
      variant: approve ? "default" : "destructive",
    });
  };

  const getTrustBadgeColor = (score: string) => {
    switch (score) {
      case "High": return "bg-trust-high text-trust-high-foreground";
      case "Medium": return "bg-trust-medium text-trust-medium-foreground"; 
      case "Low": return "bg-trust-low text-trust-low-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTrustScoreValue = (score: string) => {
    switch (score) {
      case "High": return 4.8;
      case "Medium": return 3.5;
      case "Low": return 2.1;
      default: return 0;
    }
  };

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(score) ? "fill-trust-high text-trust-high" : "text-muted"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-glow p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 pt-6">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Retailer Dashboard
          </h1>
        </div>

        {/* Search Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              Customer Lookup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter Customer ID (e.g., RV-2024-001234)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch} className="bg-gradient-primary">
                Search
              </Button>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Or scan customer QR code</div>
              <Button 
                onClick={handleScanQR} 
                variant="outline" 
                disabled={isScanning}
                className="min-w-[120px]"
              >
                <Scan className="w-4 h-4 mr-2" />
                {isScanning ? "Scanning..." : "Scan QR"}
              </Button>
            </div>

            {/* Quick Test IDs */}
            <div className="text-xs text-muted-foreground">
              <div>Test IDs: 
                <button 
                  onClick={() => setSearchId("RV-2024-001234")}
                  className="ml-1 text-primary hover:underline"
                >
                  RV-2024-001234 (High Trust)
                </button>
                {" | "}
                <button 
                  onClick={() => setSearchId("RV-2024-005678")}
                  className="text-primary hover:underline"
                >
                  RV-2024-005678 (Medium Trust)
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Profile */}
        {selectedCustomer && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Basic Info */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Customer Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {selectedCustomer.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedCustomer.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedCustomer.email}</div>
                    <div className="text-xs text-muted-foreground">ID: {selectedCustomer.id}</div>
                  </div>
                </div>

                {/* Trust Score */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Trust Score</span>
                    <Badge className={getTrustBadgeColor(selectedCustomer.trustScore)}>
                      {selectedCustomer.trustScore}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderStars(getTrustScoreValue(selectedCustomer.trustScore))}
                    <span className="text-sm font-bold text-primary">
                      {getTrustScoreValue(selectedCustomer.trustScore)}/5.0
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <div className="text-xl font-bold text-primary">{selectedCustomer.totalPurchases}</div>
                    <div className="text-xs text-muted-foreground">Total Purchases</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/5 rounded-lg">
                    <div className="text-xl font-bold text-secondary">${selectedCustomer.avgOrderValue}</div>
                    <div className="text-xs text-muted-foreground">Avg Order Value</div>
                  </div>
                </div>

                {/* Risk Factors */}
                {selectedCustomer.riskFactors.length > 0 && (
                  <div className="p-3 bg-trust-low/10 border border-trust-low/20 rounded-lg">
                    <div className="font-medium text-trust-low mb-2">Risk Factors</div>
                    <ul className="text-sm text-trust-low space-y-1">
                      {selectedCustomer.riskFactors.map((factor: string, index: number) => (
                        <li key={index}>• {factor}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Return Management */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Return Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-trust-high/10 rounded-lg">
                    <div className="text-xl font-bold text-trust-high">{selectedCustomer.successfulReturns}</div>
                    <div className="text-xs text-muted-foreground">Successful Returns</div>
                  </div>
                  <div className="text-center p-3 bg-trust-low/10 rounded-lg">
                    <div className="text-xl font-bold text-trust-low">{selectedCustomer.failedReturns}</div>
                    <div className="text-xs text-muted-foreground">Failed Returns</div>
                  </div>
                </div>

                {/* Mock Return Request */}
                <div className="p-4 border-2 border-dashed border-primary/30 rounded-lg">
                  <div className="text-center mb-3">
                    <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <div className="font-medium">Pending Return Request</div>
                    <div className="text-sm text-muted-foreground">Wireless Headphones - $89.99</div>
                    <div className="text-xs text-muted-foreground">Purchased: 2024-01-10</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      onClick={() => handleReturnDecision(true)}
                      className="bg-trust-high hover:bg-trust-high/90 text-trust-high-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      onClick={() => handleReturnDecision(false)}
                      variant="destructive"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <div className="font-medium mb-3">Recent Activity</div>
                  <div className="space-y-2">
                    {selectedCustomer.recentActivity.slice(0, 3).map((activity: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm">
                        <div>
                          <div className="font-medium">{activity.item}</div>
                          <div className="text-xs text-muted-foreground">{activity.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${activity.amount}</div>
                          <Badge variant={activity.type === "purchase" ? "secondary" : "outline"}>
                            {activity.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetailerDashboard;
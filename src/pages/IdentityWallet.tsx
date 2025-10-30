import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Star, CheckCircle2, Clock, QrCode, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Default retailer scores - would come from backend based on transaction history
const defaultRetailerScores = [
  { name: "Best Buy", score: 5.0, purchases: 0, logo: "BB" },
  { name: "Target", score: 5.0, purchases: 0, logo: "T" },
  { name: "Amazon", score: 5.0, purchases: 0, logo: "A" },
  { name: "Walmart", score: 5.0, purchases: 0, logo: "W" },
];

const IdentityWallet = () => {
  const [showQR, setShowQR] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const userData = location.state?.userData;

  useEffect(() => {
    if (!userData) {
      navigate("/kyc");
    }
  }, [userData, navigate]);

  if (!userData) {
    return null;
  }

  // Generate unique verification ID based on user data
  const generateVerificationId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `RV-${timestamp}-${random}`;
  };

  const verificationId = generateVerificationId();
  const userName = `${userData.firstName} ${userData.lastName}`;
  const verifiedDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Verification ID copied to clipboard",
    });
  };

  const getTrustBadgeColor = () => {
    // New users start with High trust
    return "bg-trust-high text-trust-high-foreground";
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
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 pt-6">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Identity Wallet
          </h1>
        </div>

        {/* User Profile Card */}
        <Card className="shadow-card">
          <CardHeader className="text-center pb-2">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="w-20 h-20 border-4 border-primary/20">
                <AvatarFallback className="text-xl font-bold bg-gradient-primary text-white">
                  {userData.firstName[0]}{userData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{userName}</CardTitle>
                <p className="text-muted-foreground text-sm">{userData.email}</p>
                <p className="text-xs text-muted-foreground mt-1">Phone: {userData.phone}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Verification ID - Prominent Display */}
            <div className="p-4 bg-gradient-primary rounded-lg text-center">
              <div className="text-xs text-white/80 mb-1">Verification ID</div>
              <div className="text-lg font-mono font-bold text-white mb-2">{verificationId}</div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => copyToClipboard(verificationId)}
                className="bg-white/20 hover:bg-white/30 text-white border-0"
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy ID
              </Button>
            </div>

            {/* Verification Status */}
            <div className="flex items-center justify-between p-3 bg-trust-high/10 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-trust-high" />
                <div>
                  <span className="font-medium block">Identity Verified</span>
                  <span className="text-xs text-muted-foreground">{verifiedDate}</span>
                </div>
              </div>
              <Badge className={getTrustBadgeColor()}>
                High Trust
              </Badge>
            </div>

            {/* User Details */}
            <div className="p-3 bg-muted/50 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID Type:</span>
                <span className="font-medium capitalize">{userData.idType.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID Number:</span>
                <span className="font-medium">{userData.idNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Address:</span>
                <span className="font-medium text-right">{userData.city}, {userData.state}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">0</div>
                <div className="text-xs text-muted-foreground">Total Purchases</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-secondary">0</div>
                <div className="text-xs text-muted-foreground">Successful Returns</div>
              </div>
            </div>

            {/* Quick Login Button */}
            <Button 
              onClick={() => setShowQR(!showQR)} 
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <QrCode className="w-4 h-4 mr-2" />
              {showQR ? "Hide" : "Show"} Login QR Code
            </Button>

            {/* QR Code Simulation */}
            {showQR && (
              <div className="p-6 bg-white rounded-lg text-center border-2 border-dashed border-primary/30">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-3">
                  <QrCode className="w-16 h-16 text-white" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Scan to login instantly at any RetailVault partner store
                </p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Expires in 5:00</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Retailer Trust Scores */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Retailer Trust Scores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {defaultRetailerScores.map((retailer) => (
              <div key={retailer.name} className="flex items-center justify-between p-3 border border-border rounded-lg hover:shadow-soft transition-shadow">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-primary text-white text-sm">
                      {retailer.logo}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{retailer.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {retailer.purchases} purchases
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(retailer.score)}
                  </div>
                  <div className="text-sm font-bold text-primary">{retailer.score}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/kyc">
            <Button variant="outline" className="w-full">
              Update Profile
            </Button>
          </Link>
          <Link to="/retailer">
            <Button variant="secondary" className="w-full">
              Retailer View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IdentityWallet;
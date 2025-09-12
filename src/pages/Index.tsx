import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Smartphone, 
  Store, 
  CheckCircle2, 
  ArrowRight, 
  Star,
  Lock,
  Zap,
  Users
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Identity Wallet",
      description: "One-time verification for lifetime trust across all retail partners",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Instant Authentication",
      description: "Login to any store with a simple QR scan - no more forms or passwords",
      color: "text-secondary"
    },
    {
      icon: Star,
      title: "Trust Score System",
      description: "Build your reputation with successful purchases and honest returns",
      color: "text-trust-high"
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your data stays encrypted and you control what retailers can see",
      color: "text-primary"
    }
  ];

  const partners = [
    { name: "Best Buy", logo: "BB", color: "bg-blue-500" },
    { name: "Target", logo: "T", color: "bg-red-500" },
    { name: "Amazon", logo: "A", color: "bg-orange-500" },
    { name: "Walmart", logo: "W", color: "bg-blue-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-glow">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm mb-8">
            <Shield className="w-4 h-4" />
            Trusted by 50,000+ customers
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              RetailVault
            </span>
            <br />
            <span className="text-foreground">Identity</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            The future of retail identity. Verify once, shop everywhere. 
            Build trust, skip the hassle, and revolutionize your shopping experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/kyc">
              <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 h-auto">
                <Smartphone className="w-5 h-5 mr-2" />
                Get Your Digital ID
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/retailer">
              <Button variant="outline" className="text-lg px-8 py-6 h-auto border-primary/30 hover:border-primary">
                <Store className="w-5 h-5 mr-2" />
                Retailer Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">RetailVault ID</span>?
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience the next generation of secure, seamless retail identity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="shadow-card hover:shadow-glow transition-shadow duration-300 border-border/50">
                <CardHeader className="text-center pb-2">
                  <div className={`w-12 h-12 ${feature.color} bg-current/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-muted/30 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to transform your shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Verify Once</h3>
              <p className="text-muted-foreground leading-relaxed">
                Complete a one-time identity verification process with bank-level security. 
                Your information is encrypted and stored safely.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">Shop Everywhere</h3>
              <p className="text-muted-foreground leading-relaxed">
                Use your RetailVault ID at any partner store. Simply scan your QR code 
                for instant authentication and checkout.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Build Trust</h3>
              <p className="text-muted-foreground leading-relaxed">
                Each successful interaction builds your trust score, unlocking 
                better deals, easier returns, and VIP treatment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted Partner Network</h2>
          <p className="text-lg text-muted-foreground">
            Use your RetailVault ID at these leading retailers and many more
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border/50 hover:shadow-soft transition-shadow">
              <div className={`w-12 h-12 ${partner.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                {partner.logo}
              </div>
              <span className="text-lg font-medium">{partner.name}</span>
              <CheckCircle2 className="w-5 h-5 text-trust-high" />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            50,000+ verified users and growing
          </Badge>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Shopping Experience?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who have simplified their retail identity
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/wallet">
              <Button variant="secondary" className="text-lg px-8 py-6 h-auto hover:shadow-trust">
                <Shield className="w-5 h-5 mr-2" />
                View Demo Wallet
              </Button>
            </Link>
            <Link to="/kyc">
              <Button variant="outline" className="text-lg px-8 py-6 h-auto border-white/30 text-white hover:bg-white/10">
                Start Verification
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

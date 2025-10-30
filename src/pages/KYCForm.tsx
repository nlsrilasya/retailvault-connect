import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, CheckCircle2, Upload, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";

// Validation schema
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"),
  idType: z.string().min(1, "ID type is required"),
  idNumber: z.string().min(1, "ID number is required"),
  aadhar: z.string().regex(/^[0-9]{12}$/, "Aadhar number must be exactly 12 digits"),
  agreedToTerms: z.boolean().refine(val => val === true, "You must agree to terms and conditions"),
  agreedToPrivacy: z.boolean().refine(val => val === true, "You must agree to privacy policy"),
}).refine((data) => {
  // Validate ID number based on ID type
  if (data.idType === "passport") {
    return data.idNumber.length === 8;
  } else if (data.idType === "drivers_license") {
    return data.idNumber.length >= 8 && data.idNumber.length <= 16;
  } else if (data.idType === "state_id") {
    return data.idNumber.length >= 5 && data.idNumber.length <= 20;
  }
  return true;
}, {
  message: "Invalid ID number format for selected ID type",
  path: ["idNumber"]
});

type FormValues = z.infer<typeof formSchema>;

const KYCForm = () => {
  const [showAadhar, setShowAadhar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      idType: "",
      idNumber: "",
      aadhar: "",
      agreedToTerms: false,
      agreedToPrivacy: false,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFiles(e.target.files);
      toast({
        title: "Files Uploaded",
        description: `${e.target.files.length} file(s) selected successfully`,
      });
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate KYC processing
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Verification Complete!",
        description: `${data.firstName} ${data.lastName}, your identity has been successfully verified. Email: ${data.email}, Phone: ${data.phone}`,
      });
      navigate("/wallet", { state: { userData: data } });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-glow p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 pt-6">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Identity Verification
          </h1>
        </div>

        {/* Info Card */}
        <Card className="shadow-card border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-primary">Secure One-Time Verification</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Complete this verification once to use your RetailVault ID at all partner stores. 
                  Your information is encrypted and stored securely.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KYC Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="9876543210" 
                            maxLength={10}
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ''))}
                          />
                        </FormControl>
                        <FormDescription>Enter 10 digit mobile number</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Date of Birth */}
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input placeholder="Mumbai" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="MH">Maharashtra</SelectItem>
                              <SelectItem value="DL">Delhi</SelectItem>
                              <SelectItem value="KA">Karnataka</SelectItem>
                              <SelectItem value="TN">Tamil Nadu</SelectItem>
                              <SelectItem value="WB">West Bengal</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pincode *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="400001" 
                              maxLength={6}
                              {...field} 
                              onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ''))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Identity Verification */}
            <Card className="shadow-card mt-6">
              <CardHeader>
                <CardTitle>Identity Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* ID Type and Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="idType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID Type *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select ID type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="drivers_license">Driver's License</SelectItem>
                            <SelectItem value="passport">Passport</SelectItem>
                            <SelectItem value="state_id">State ID</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="idNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID Number *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={
                              form.watch("idType") === "passport" 
                                ? "8 character code" 
                                : form.watch("idType") === "drivers_license"
                                ? "8-16 characters"
                                : "Enter ID number"
                            } 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          {form.watch("idType") === "passport" && "Passport must be 8 characters"}
                          {form.watch("idType") === "drivers_license" && "License must be 8-16 characters"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Aadhar Number (Mandatory) */}
                <FormField
                  control={form.control}
                  name="aadhar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhar Number *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showAadhar ? "text" : "password"}
                            placeholder="123456789012"
                            maxLength={12}
                            {...field}
                            onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ''))}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-0 h-full"
                            onClick={() => setShowAadhar(!showAadhar)}
                          >
                            {showAadhar ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>Enter 12 digit Aadhar number</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Document Upload */}
                <div className="space-y-2">
                  <Label>Document Upload *</Label>
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground mb-2">
                      Upload a clear photo of your ID (front and back)
                    </div>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Choose Files
                    </Button>
                    {uploadedFiles && (
                      <p className="text-sm text-primary mt-2">
                        {uploadedFiles.length} file(s) selected
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Submit */}
            <Card className="shadow-card mt-6">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Agreement Checkboxes */}
                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="agreedToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm leading-relaxed">
                              I agree to the <button type="button" className="text-primary hover:underline">Terms & Conditions</button> and 
                              understand that my information will be used for identity verification purposes.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="agreedToPrivacy"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm leading-relaxed">
                              I have read and agree to the <button type="button" className="text-primary hover:underline">Privacy Policy</button> and 
                              consent to the processing of my personal data.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Verifying Identity...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Complete Verification
                      </>
                    )}
                  </Button>

                  {isSubmitting && (
                    <div className="text-center text-sm text-muted-foreground">
                      Please wait while we verify your information...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default KYCForm;
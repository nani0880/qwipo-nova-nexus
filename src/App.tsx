import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Recommendations from "./pages/Recommendations";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import RetailerDashboard from "./pages/dashboard/RetailerDashboard";
import DistributorDashboard from "./pages/dashboard/DistributorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import Inventory from "./pages/Inventory";
import Retailers from "./pages/Retailers";
import AdminUsers from "./pages/admin/Users";
import AdminSystem from "./pages/admin/System";
import AdminSettings from "./pages/admin/AdminSettings";
import RetailerProfile from "./pages/profile/RetailerProfile";
import DistributorProfile from "./pages/profile/DistributorProfile";
import AdminProfile from "./pages/profile/AdminProfile";
import Checkout from "./pages/Checkout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<Help />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/careers" element={<Careers />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Role-based Dashboard Routes */}
              <Route
                path="/dashboard/retailer"
                element={
                  <ProtectedRoute roles={['retailer']}>
                    <RetailerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/distributor"
                element={
                  <ProtectedRoute roles={['distributor']}>
                    <DistributorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/admin"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              
              {/* Protected Feature Routes */}
              <Route
                path="/recommendations"
                element={
                  <ProtectedRoute roles={['retailer']}>
                    <Recommendations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute roles={['retailer']}>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute roles={['retailer']}>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              
              {/* Role-specific Profile Routes */}
              <Route
                path="/profile/retailer"
                element={
                  <ProtectedRoute roles={['retailer']}>
                    <RetailerProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/distributor"
                element={
                  <ProtectedRoute roles={['distributor']}>
                    <DistributorProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/admin"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <AdminProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute roles={['distributor', 'admin']}>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              
              {/* Additional Pages */}
              <Route
                path="/inventory"
                element={
                  <ProtectedRoute roles={['distributor']}>
                    <Inventory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/retailers"
                element={
                  <ProtectedRoute roles={['distributor']}>
                    <Retailers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/system"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <AdminSystem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <AdminSettings />
                  </ProtectedRoute>
                }
              />
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

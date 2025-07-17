import {
  BookOpenIcon,
  ChartBarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect } from "react";

import { useUser } from "@/contexts/UserContext";
import {
  confirmSignIn,
  fetchUserAttributes,
  getCurrentUser,
  signIn,
} from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [setNewPassword, setSetNewPassword] = React.useState<boolean>(false);

  // const navigate = useNavigate();

  const { setUser } = useUser();

  // const { login } = useUser();
  // const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // const handleRoleSelect = (role: 'student' | 'ssa' | 'admin' | 'mentor') => {
  //   // setSelectedRole(role);
  //   login(role);
  //   navigate(`/${role}`);
  // };

  // const roles = [
  //   {
  //     id: 'student',
  //     name: 'Student',
  //     description: 'Access your learning journey, activities, and progress',
  //     icon: AcademicCapIcon,
  //     color: '#007BFF',
  //     features: ['Track your progress', 'Access learning materials', 'Connect with mentors'],
  //   },
  //   {
  //     id: 'mentor',
  //     name: 'Mentor',
  //     description: 'Guide and support students in their learning journey',
  //     icon: UserPlusIcon,
  //     color: '#6F42C1',
  //     features: ['Guide students', 'Share expertise', 'Monitor progress'],
  //   },
  //   {
  //     id: 'ssa',
  //     name: 'SSA',
  //     description: 'Manage student activities and track progress',
  //     icon: UserGroupIcon,
  //     color: '#28A745',
  //     features: ['Manage students', 'Track activities', 'Generate reports'],
  //   },
  //   {
  //     id: 'admin',
  //     name: 'Admin',
  //     description: 'System-wide management and configuration',
  //     icon: ShieldCheckIcon,
  //     color: '#DC3545',
  //     features: ['System configuration', 'User management', 'Analytics'],
  //   },
  // ];

  useEffect(() => {
    async function checkUser() {
      try {
        getUser();
      } catch (err) {
        // Do nothing
      }
    }

    checkUser();
  }, []);

  const features = [
    {
      icon: SparklesIcon,
      title: "Personalized Learning",
      description: "Tailored educational experiences for every student",
    },
    {
      icon: ChartBarIcon,
      title: "Progress Tracking",
      description: "Real-time monitoring of academic and personal growth",
    },
    {
      icon: BookOpenIcon,
      title: "Resource Library",
      description: "Access to comprehensive learning materials",
    },
  ];

  async function handleSignIn() {
    setLoading(true);
    setError(null);

    // Use Amplify Sign in method here and handle result
    try {
      const signInResponse = await signIn({
        username: userName,
        password: password,
      });

      console.log("signInResponse", signInResponse);

      if (signInResponse.nextStep.signInStep !== "DONE") {
        setSetNewPassword(true);
        setLoading(false);
        return;
      }



      getUser();
    } catch (err) {
      console.error("Error signing in:", err);
      setError("Invalid username or password. Please try again.");
    }
    setLoading(false);
  }

  async function handleConfirmSignIn() {
    setLoading(true);
    setError(null);
    try {
      const confirmSignInResponse = await confirmSignIn({
        challengeResponse: password,
      });

      if (confirmSignInResponse.isSignedIn) {
        getUser();
      } else {
        setError("Error confirming sign in. Please try again.");
      }
    } catch (err) {
      console.error("Error confirming sign in:", err);
      setError("Error confirming sign in. Please try again.");
    }
  }

  async function getUser() {
    try {
      const cognitoUser = await getCurrentUser();
      console.log("Cognito user:", cognitoUser);
      if (!cognitoUser) {
        console.error("No user found");
        return;
      }
      const userAttributes = await fetchUserAttributes();

      console.log("User attributes:", userAttributes);

      setUser({
        sub: cognitoUser.userId,
        givenName: userAttributes.given_name,
        familyName: userAttributes.family_name,
        email: userAttributes.user,
        role: userAttributes["custom:role"] as
          | "participant"
          | "ssa"
          | "admin"
          | "mentor",
      });

      switch (userAttributes["custom:role"]) {
        case "participant":
          navigate("/student");
          break;
        case "mentor":
          navigate("/mentor");
          break;
        case "ssa":
          navigate("/ssa");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/student");
          break;
      }
    } catch (err) {
      console.error("Error getting user:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="/images/steele_wise_logo.avif"
                alt="WISE Portal Logo"
                className="h-10 w-auto"
              />
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">
                Features
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">
                About
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Welcome to{" "}
              <span className="text-[var(--wise-orange)]">WISE Portal</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
              Your comprehensive platform for academic success, career
              development, and personal growth.
            </p>
            {/*Sign In Area*/}
            {!setNewPassword && (
              <>
                <input
                  type="email"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-4 w-full max-w-xs border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)]"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-2 w-full max-w-xs border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)]"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button
                  onClick={handleSignIn}
                  className={`mt-4 w-full max-w-xs bg-[var(--wise-orange)] text-white rounded-lg p-2 hover:bg-[var(--wise-orange-dark)] transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </>
            )}
            {setNewPassword && (
              <>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="mt-2 w-full max-w-xs border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)]"
                />
                <button
                  onClick={handleConfirmSignIn}
                  className={`mt-4 w-full max-w-xs bg-[var(--wise-orange)] text-white rounded-lg p-2 hover:bg-[var(--wise-orange-dark)] transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Set New Password"}
                </button>
              </>
            )}
          </div>
          <div className="md:w-1/2">
            <img
              src="/images/wise_group.png"
              alt="WISE Portal Hero"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Role Selection Cards */}
        {/* <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Select Your Role</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id as 'student' | 'ssa' | 'admin' | 'mentor')}
                  className="group relative bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-[var(--wise-orange)]"
                >
                  <div className="flex flex-col items-center text-center">
                    <div 
                      className="flex items-center justify-center w-10 h-10 rounded-lg mb-3 transition-transform duration-300 group-hover:scale-110" 
                      style={{ backgroundColor: `${role.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: role.color }} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div> */}
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Key Features
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Discover what makes WISE Portal the perfect platform for your
              educational journey
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-8 text-center"
                >
                  <div className="flex justify-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--wise-orange-light)]">
                      <Icon className="w-8 h-8 text-[var(--wise-orange)]" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About WISE Portal</h3>
              <p className="text-gray-400">
                Empowering students, mentors, and administrators with a
                comprehensive platform for educational success.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">
                Email: support@wiseportal.com
                <br />
                Phone: (555) 123-4567
                <br />
                Address: 123 Education St, Learning City
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} WISE Portal. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;

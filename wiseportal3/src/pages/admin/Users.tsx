import {
  ArchiveBoxIcon,
  ArrowPathIcon,
  BuildingOfficeIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { generateClient } from "aws-amplify/api";
import { Schema } from '../../../amplify/data/resource';
import { signUp } from "aws-amplify/auth";
import React, { useState } from "react";

interface User {
  id: string | undefined;
  name: string;
  birthdate?: string;
  email: string;
  role: string;
  organizationId: string;
  status: string;
  lastLogin: string;
  createdAt: string;
  organizations?: string[]; // Support for multiple organizations
}

interface RoleDescription {
  name: string;
  userRole: string;
  description: string;
  permissions: string[];
}

const roleDescriptions: Record<string, RoleDescription> = {
  "Senior Scholarship Administrator (SSA)": {
    userRole: "ssa",
    name: "Senior Scholarship Administrator (SSA)",
    description:
      "Manages scholarship programs, reviews applications, and oversees the scholarship process.",
    permissions: [
      "Review and approve scholarship applications",
      "Manage scholarship programs",
      "Generate reports",
      "Assign reviewers",
      "Set scholarship criteria",
    ],
  },
  // 'Vocational Guidance Counselor': {
  //   name: 'Vocational Guidance Counselor',
  //   description: 'Provides career guidance and support to students.',
  //   permissions: [
  //     'View student profiles',
  //     'Provide career guidance',
  //     'Schedule counseling sessions',
  //     'Track student progress',
  //     'Generate career reports'
  //   ]
  // },
  // 'Social Experience Coordinator': {
  //   name: 'Social Experience Coordinator',
  //   description: 'Manages social activities and non-formal learning experiences.',
  //   permissions: [
  //     'Create and manage social activities',
  //     'Track participation',
  //     'Generate activity reports',
  //     'Manage event schedules',
  //     'Communicate with participants'
  //   ]
  // },
  "Program Administrator": {
    name: "Program Administrator",
    userRole: "admin",
    description: "Manages program operations and administrative tasks.",
    permissions: [
      "Manage program settings",
      "Handle user registrations",
      "Process applications",
      "Generate administrative reports",
      "Manage program resources",
    ],
  },
  "Professional Advisor": {
    name: "Professional Advisor",
    userRole: "mentor",
    description: "Provides professional guidance and mentorship to students.",
    permissions: [
      "View student profiles",
      "Provide professional guidance",
      "Schedule mentoring sessions",
      "Track student progress",
      "Generate mentoring reports",
    ],
  },
  Student: {
    name: "Student",
    userRole: "student",
    description: "Participates in programs and applies for scholarships.",
    permissions: [
      "View available scholarships",
      "Apply for scholarships",
      "Track application status",
      "Access program resources",
      "Participate in discussions",
    ],
  },
};

const roles = Object.keys(roleDescriptions);

const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Senior Scholarship Administrator (SSA)",
    organizationId: "WISE Foundation",
    status: "active",
    lastLogin: "2024-03-15T10:30:00",
    createdAt: "2024-01-15T09:00:00",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "Vocational Guidance Counselor",
    organizationId: "Career Development Center",
    status: "active",
    lastLogin: "2024-03-14T15:45:00",
    createdAt: "2024-02-01T10:00:00",
  },
  // Add more sample users as needed
];

const Users: React.FC = () => {
  const client = generateClient<Schema>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedOrg, setSelectedOrg] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "active" | "archived"
  >("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRoleInfoModalOpen, setIsRoleInfoModalOpen] = useState(false);
  // const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || user.role === selectedRole;
    const matchesOrg = !selectedOrg || user.organizationId === selectedOrg;
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesOrg && matchesStatus;
  });

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const { data } = await client.models.User.list({});
  //       setUsers(data);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  const handleArchiveUser = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "archived" } : user
      )
    );
  };

  const handleRestoreUser = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "active" } : user
      )
    );
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const handleCreateUser = async (newUser: Omit<User, "id">) => {
    try {
      const { userId } = await signUp({
        username: newUser.email,
        password: "Welcome123!",
        options: {
          userAttributes: {
            email: newUser.email,
            name: newUser.name,
            "custom:role": newUser.role,
          },
        },
      });

      let user = {
        id: userId,
        organizationId: newUser.organizationId,
        status: "active",
      };
      

      await client.models.User.create(user);

      const fullUser = {
        ...user,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }
      
      setUsers([...users, fullUser]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                User Management
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage users across the platform
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn btn-primary"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Role Information Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsRoleInfoModalOpen(true)}
          className="btn btn-secondary"
        >
          <InformationCircleIcon className="h-5 w-5 mr-2" />
          Role Information
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label htmlFor="search" className="label">
                Search
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="input pl-10"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="role" className="label">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="input"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">All Roles</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="organization" className="label">
                Organization
              </label>
              <select
                id="organization"
                name="organization"
                className="input"
                value={selectedOrg}
                onChange={(e) => setSelectedOrg(e.target.value)}
              >
                <option value="">All Organizations</option>
                <option value="WISE Foundation">WISE Foundation</option>
                <option value="Career Development Center">
                  Career Development Center
                </option>
                {/* Add more organizations as needed */}
              </select>
            </div>
            <div>
              <label htmlFor="status" className="label">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="input"
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(
                    e.target.value as "all" | "active" | "archived"
                  )
                }
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Organization
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Login
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <UserGroupIcon className="h-10 w-10 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">
                          {user.organizationId}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`status-badge ${user.status}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-[var(--wise-blue)] hover:text-[var(--wise-blue)]/80"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        {user.status === "active" ? (
                          <button
                            onClick={() => handleArchiveUser(user.id ? user.id : "")}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <ArchiveBoxIcon className="h-5 w-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRestoreUser(user.id ? user.id : "")}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <ArrowPathIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Role Information Modal */}
      {isRoleInfoModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Role Information
              </h3>
              <button
                onClick={() => setIsRoleInfoModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-6">
              {Object.values(roleDescriptions).map((role) => (
                <div key={role.name} className="border-b border-gray-200 pb-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    {role.name}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {role.description}
                  </p>
                  <div className="mt-2">
                    <h5 className="text-sm font-medium text-gray-700">
                      Permissions:
                    </h5>
                    <ul className="mt-1 list-disc list-inside text-sm text-gray-500">
                      {role.permissions.map((permission, index) => (
                        <li key={index}>{permission}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit User</h3>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingUser(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit(editingUser);
              }}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="role" className="label">
                    Role
                  </label>
                  <select
                    id="role"
                    className="input"
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="organization" className="label">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    className="input"
                    value={editingUser.organizationId}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        organizationId: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="organizations" className="label">
                    Additional Organizations
                  </label>
                  <input
                    type="text"
                    id="organizations"
                    className="input"
                    value={editingUser.organizations?.join(", ") || ""}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        organizations: e.target.value
                          .split(",")
                          .map((org) => org.trim()),
                      })
                    }
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingUser(null);
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Create New User
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleCreateUser({
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  role: formData.get("role") as string,
                  organizationId: formData.get("organization") as string,
                  status: "active",
                  lastLogin: new Date().toISOString(),
                  createdAt: new Date().toISOString(),
                });
              }}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="role" className="label">
                    Role
                  </label>
                  <select name="role" id="role" className="input" required>
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="organization" className="label">
                    Organization
                  </label>
                  <input
                    type="text"
                    name="organization"
                    id="organization"
                    className="input"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

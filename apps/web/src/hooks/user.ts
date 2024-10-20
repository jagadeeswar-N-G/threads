import { getCurrentUser } from "@/src//graphql/query/user";
import { useQuery } from "@tanstack/react-query";
import { graphQLClient } from "../clients/api";

interface CurrentUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImageURL?: string;
  }
  
  export interface QueryResponse {
    getCurrentUser: CurrentUser | null; // Use null to handle cases where the user might not be logged in
  }
  
  export const useCurrentUser = () => {
    const query = useQuery<QueryResponse>({
      queryKey: ["currentUser"],
      queryFn: async () => {
        try {
          return await graphQLClient.request(getCurrentUser as any);
        } catch (error) {
          console.error("GraphQL error:", error);
          throw error;
        }
      },
    });
    return { ...query, user: query.data?.getCurrentUser };
  };
  
  
export interface Organization {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string | null;
    name: string;
    company: string | null;
    blog: string;
    location: string | null;
    email: string | null;
    twitter_username: string | null;
    is_verified: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
    updated_at: string;
    archived_at: string | null;
    type: string;
  }
  
  
export interface OrgsState{
    loading: boolean;
    error: string | null;
    orgs: Organization[];
    page: number;
    query: string;
    currentOrg:Organization | null;
}
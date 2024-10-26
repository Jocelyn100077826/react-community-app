import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Organization, OrgsState} from "@/app/interfaces/Organization";


// === HARD CODED TO SAVE TIME ===

const popularOrgs: Organization[] = [
    {
      login: "reactjs",
      id: 6412038,
      node_id: "MDEyOk9yZ2FuaXphdGlvbjY0MTIwMzg=",
      url: "https://api.github.com/orgs/reactjs",
      repos_url: "https://api.github.com/orgs/reactjs/repos",
      events_url: "https://api.github.com/orgs/reactjs/events",
      hooks_url: "https://api.github.com/orgs/reactjs/hooks",
      issues_url: "https://api.github.com/orgs/reactjs/issues",
      members_url: "https://api.github.com/orgs/reactjs/members{/member}",
      public_members_url: "https://api.github.com/orgs/reactjs/public_members{/member}",
      avatar_url: "https://avatars.githubusercontent.com/u/6412038?v=4",
      description: "React website and its localizations",
      name: "React Community",
      company: null,
      blog: "https://reactjs.org",
      location: "Everywhere",
      email: null,
      twitter_username: null,
      is_verified: true,
      has_organization_projects: true,
      has_repository_projects: true,
      public_repos: 70,
      public_gists: 0,
      followers: 4821,
      following: 0,
      html_url: "https://github.com/reactjs",
      created_at: "2014-01-15T17:46:37Z",
      updated_at: "2022-04-01T07:03:51Z",
      archived_at: null,
      type: "Organization"
    },
    {
        login: "vitejs",
        id: 65625612,
        node_id: "MDEyOk9yZ2FuaXphdGlvbjY1NjI1NjEy",
        url: "https://api.github.com/orgs/vitejs",
        repos_url: "https://api.github.com/orgs/vitejs/repos",
        events_url: "https://api.github.com/orgs/vitejs/events",
        hooks_url: "https://api.github.com/orgs/vitejs/hooks",
        issues_url: "https://api.github.com/orgs/vitejs/issues",
        members_url: "https://api.github.com/orgs/vitejs/members{/member}",
        public_members_url: "https://api.github.com/orgs/vitejs/public_members{/member}",
        avatar_url: "https://avatars.githubusercontent.com/u/65625612?v=4",
        description: "A fast build tool for JavaScript apps",
        name: "Vite",
        company: null,
        blog: "https://vitejs.dev",
        location: null,
        email: null,
        twitter_username: "vite_js",
        is_verified: true,
        has_organization_projects: true,
        has_repository_projects: true,
        public_repos: 24,
        public_gists: 0,
        followers: 2756,
        following: 0,
        html_url: "https://github.com/vitejs",
        created_at: "2020-05-19T19:57:51Z",
        updated_at: "2024-09-16T09:29:17Z",
        archived_at: null,
        type: "Organization"
    },
    {
        login: "sveltejs",
        id: 23617963,
        node_id: "MDEyOk9yZ2FuaXphdGlvbjIzNjE3OTYz",
        url: "https://api.github.com/orgs/sveltejs",
        repos_url: "https://api.github.com/orgs/sveltejs/repos",
        events_url: "https://api.github.com/orgs/sveltejs/events",
        hooks_url: "https://api.github.com/orgs/sveltejs/hooks",
        issues_url: "https://api.github.com/orgs/sveltejs/issues",
        members_url: "https://api.github.com/orgs/sveltejs/members{/member}",
        public_members_url: "https://api.github.com/orgs/sveltejs/public_members{/member}",
        avatar_url: "https://avatars.githubusercontent.com/u/23617963?v=4",
        description: "Cybernetically enhanced web apps",
        name: "Svelte",
        company: null,
        blog: "https://svelte.dev",
        location: "pkg.devDependencies",
        email: null,
        twitter_username: null,
        is_verified: true,
        has_organization_projects: true,
        has_repository_projects: true,
        public_repos: 75,
        public_gists: 0,
        followers: 3592,
        following: 0,
        html_url: "https://github.com/sveltejs",
        created_at: "2016-11-20T18:03:26Z",
        updated_at: "2023-09-10T11:34:14Z",
        archived_at: null,
        type: "Organization"
    },
    {
        login: "vuejs",
        id: 6128107,
        node_id: "MDEyOk9yZ2FuaXphdGlvbjYxMjgxMDc=",
        url: "https://api.github.com/orgs/vuejs",
        repos_url: "https://api.github.com/orgs/vuejs/repos",
        events_url: "https://api.github.com/orgs/vuejs/events",
        hooks_url: "https://api.github.com/orgs/vuejs/hooks",
        issues_url: "https://api.github.com/orgs/vuejs/issues",
        members_url: "https://api.github.com/orgs/vuejs/members{/member}",
        public_members_url: "https://api.github.com/orgs/vuejs/public_members{/member}",
        avatar_url: "https://avatars.githubusercontent.com/u/6128107?v=4",
        description: "Your friendly JavaScript framework",
        name: "Vue",
        company: null,
        blog: "https://vuejs.org",
        location: "All Over the World",
        email: null,
        twitter_username: "vuejs",
        is_verified: true,
        has_organization_projects: true,
        has_repository_projects: true,
        public_repos: 123,
        public_gists: 0,
        followers: 16738,
        following: 0,
        html_url: "https://github.com/vuejs",
        created_at: "2013-12-07T06:13:00Z",
        updated_at: "2024-10-09T11:24:59Z",
        archived_at: null,
        type: "Organization"
    }
  ];

// ================================

const initialState: OrgsState = {
  loading: false,
  error: null,
  orgs: popularOrgs,
  page:0,
  query:"",
  currentOrg:null,
};

const orgsSlice = createSlice({
  name: 'orgs',
  initialState,
  reducers: {
    fetchOrgRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.query = action.payload
    },
    fetchOrgsSuccess: (state, action: PayloadAction<Organization>) => {
      state.loading = false;
      state.currentOrg = action.payload;
    },
    fetchOrgsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchOrgRequest, fetchOrgsSuccess, fetchOrgsFailure } = orgsSlice.actions;
export default orgsSlice.reducer;

import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import OutCall "http-outcalls/outcall";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type without Email
  public type UserProfile = {
    name : Text;
    bio : ?Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Project Types
  type Project = {
    name : Text;
    description : Text;
    chain : Text;
    launchDate : Int;
    riskLevel : Text;
    riskExplanation : Text;
    auditPresence : Bool;
    teamTransparency : Bool;
    liquidity : Nat;
    volume : Nat;
    lessons : [Lesson];
    quizzes : [Quiz];
    videos : [Video];
  };

  type Lesson = {
    title : Text;
    content : Text;
    chain : Text;
  };

  type Quiz = {
    question : Text;
    options : [Text];
    correctAnswer : Nat;
    chain : Text;
  };

  type Video = {
    title : Text;
    url : Text;
    chain : Text;
  };

  type ProjectAnalytics = {
    chainSelections : Nat;
    projectOpens : Nat;
    riskDetailsExpands : Nat;
    lessonStarts : Nat;
    lessonCompletes : Nat;
    quizSubmits : Nat;
  };

  // Data Provider Configuration (Admin-only)
  type DataProviderConfig = {
    url : Text;
    apiKey : Text;
  };

  let dataProviderConfigs = Map.empty<Text, DataProviderConfig>();

  let projects = Map.empty<Principal, List.List<Project>>();
  let analytics = Map.empty<Principal, ProjectAnalytics>();

  func calculateRiskLevel(auditPresence : Bool, teamTransparency : Bool, liquidity : Nat, volume : Nat, launchDate : Int) : (Text, Text) {
    var score = 0;
    if (auditPresence) { score += 2 };
    if (teamTransparency) { score += 2 };
    if (liquidity > 10000) { score += 1 };
    if (volume > 100000) { score += 1 };
    if (Time.now() - launchDate < 31536000000) { score -= 2 };

    var riskLevel = "Medium";
    var explanation = "This project has a moderate level of risk based on the provided factors.";

    if (score >= 4) {
      riskLevel := "Low";
      explanation := "This project exhibits strong positive signals such as audits, team transparency, and healthy financials.";
    } else if (score <= 1) {
      riskLevel := "High";
      explanation := "This project lacks some risk management features and consideration by the community.";
    };
    (riskLevel, explanation);
  };

  public shared ({ caller }) func addProject(
    name : Text,
    description : Text,
    chain : Text,
    launchDate : Int,
    auditPresence : Bool,
    teamTransparency : Bool,
    liquidity : Nat,
    volume : Nat,
    lessons : [Lesson],
    quizzes : [Quiz],
    videos : [Video],
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add projects");
    };

    let (riskLevel, riskExplanation) = calculateRiskLevel(
      auditPresence,
      teamTransparency,
      liquidity,
      volume,
      launchDate,
    );

    let newProject : Project = {
      name;
      description;
      chain;
      launchDate;
      riskLevel;
      riskExplanation;
      auditPresence;
      teamTransparency;
      liquidity;
      volume;
      lessons;
      quizzes;
      videos;
    };

    let existingProjects = switch (projects.get(caller)) {
      case (null) { List.empty<Project>() };
      case (?projectList) { projectList };
    };
    existingProjects.add(newProject);
    projects.add(caller, existingProjects);
  };

  public query ({ caller }) func getProjects() : async [Project] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view projects");
    };

    let projectList = switch (projects.get(caller)) {
      case (null) { List.empty<Project>() };
      case (?existingProjects) { existingProjects };
    };
    projectList.toArray();
  };

  public query ({ caller }) func getAnalytics() : async ProjectAnalytics {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view analytics");
    };

    switch (analytics.get(caller)) {
      case (null) {
        let initialAnalytics : ProjectAnalytics = {
          chainSelections = 0;
          projectOpens = 0;
          riskDetailsExpands = 0;
          lessonStarts = 0;
          lessonCompletes = 0;
          quizSubmits = 0;
        };
        analytics.add(caller, initialAnalytics);
        initialAnalytics;
      };
      case (?existingAnalytics) { existingAnalytics };
    };
  };

  public shared ({ caller }) func updateAnalytics(
    chainSelections : Nat,
    projectOpens : Nat,
    riskDetailsExpands : Nat,
    lessonStarts : Nat,
    lessonCompletes : Nat,
    quizSubmits : Nat,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update analytics");
    };

    let updatedAnalytics = {
      chainSelections;
      projectOpens;
      riskDetailsExpands;
      lessonStarts;
      lessonCompletes;
      quizSubmits;
    };
    analytics.add(caller, updatedAnalytics);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Admin-only: Configure data provider secrets
  public shared ({ caller }) func configureDataProvider(providerId : Text, url : Text, apiKey : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can configure data providers");
    };

    let config : DataProviderConfig = {
      url;
      apiKey;
    };
    dataProviderConfigs.add(providerId, config);
  };

  // Admin-only: Remove data provider configuration
  public shared ({ caller }) func removeDataProvider(providerId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove data providers");
    };

    dataProviderConfigs.remove(providerId);
  };

  // User function: Fetch projects from configured data provider
  public shared ({ caller }) func fetchProjectsFromProvider(providerId : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can fetch projects");
    };

    let config = switch (dataProviderConfigs.get(providerId)) {
      case (null) {
        Runtime.trap("Data provider not configured");
      };
      case (?c) { c };
    };

    let headers = [{ name = "Authorization"; value = config.apiKey }];
    await OutCall.httpGetRequest(config.url, headers, transform);
  };

  public query ({ caller }) func getProjectById(projectId : Nat) : async ?Project {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view projects");
    };

    let projectList = switch (projects.get(caller)) {
      case (null) { return null };
      case (?existingProjects) { existingProjects };
    };

    let filteredProjects = projectList.toArray().filter(
      func(p) { p.launchDate == projectId }
    );

    if (filteredProjects.size() == 0) {
      null;
    } else {
      ?filteredProjects[0];
    };
  };

  // Check data provider status (returns whether provider is configured and reachable)
  public shared ({ caller }) func checkDataProviderStatus(providerId : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check data provider status");
    };

    let config = switch (dataProviderConfigs.get(providerId)) {
      case (null) { return false };
      case (?c) { c };
    };

    let headers = [];
    let response = await OutCall.httpGetRequest(config.url, headers, transform);
    not response.isEmpty();
  };

  // Query available data providers (returns list of configured provider IDs)
  public query ({ caller }) func getAvailableDataProviders() : async [Text] {
    // Allow any authenticated user (including guests) to see which providers are configured
    dataProviderConfigs.keys().toArray();
  };
};

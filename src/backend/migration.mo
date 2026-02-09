import Map "mo:core/Map";

module {
  type OldUserProfile = {
    name : Text;
    email : ?Text;
    bio : ?Text;
  };

  type OldActor = {
    userProfiles : Map.Map<Principal, OldUserProfile>;
  };

  type NewUserProfile = {
    name : Text;
    bio : ?Text;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, NewUserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    let newUserProfiles = old.userProfiles.map<Principal, OldUserProfile, NewUserProfile>(
      func(_principal, oldProfile) {
        {
          name = oldProfile.name;
          bio = oldProfile.bio;
        };
      }
    );
    {
      userProfiles = newUserProfiles;
    };
  };
};

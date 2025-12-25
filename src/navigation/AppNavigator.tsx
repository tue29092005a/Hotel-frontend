import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./RootNavigator";
import { User } from "../types";

const AppNavigator: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User): void => {
    setCurrentUser(user);
    console.log("Logged in user:", user);
  };

  const handleLogout = (): void => {
    setCurrentUser(null);
  };

  return (
    <NavigationContainer>
      <RootNavigator 
        user={currentUser} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
    </NavigationContainer>
  );
};

export default AppNavigator;
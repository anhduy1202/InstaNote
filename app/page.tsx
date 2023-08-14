import "@aws-amplify/ui-react/styles.css";
import HomePage from "@/components/Home/HomePage";
import MenuNav from "@/components/Home/Menu";
import { RequireAuth } from "@/components/RequireAuth/RequireAuth";

export default function App() {

  return (
    <RequireAuth>
      <MenuNav />
      <HomePage />
    </RequireAuth>
  );
}

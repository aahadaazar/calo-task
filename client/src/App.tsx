import { Grid } from "@mui/material";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import { QueryClient, QueryClientProvider } from "react-query";
import JobCreationModal from "./components/JobCreationModal";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Grid spacing={2} container>
          <Grid xs={12} item>
            <Header />
          </Grid>
          <Grid xs={12} item>
            <Routes>
              <Route path="/" element={<Jobs />} />
              <Route path="/job/:uuid" element={<JobDetails />} />
            </Routes>
          </Grid>
        </Grid>
        <JobCreationModal />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

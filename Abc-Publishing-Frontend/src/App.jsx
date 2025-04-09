import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Section = lazy(() => import("./pages/Section"));

function App() {
  return (
    <Suspense fallback={<p>Loading section...</p>}>
      <Routes>
        <Route path="/" element={<Navigate to="section/preface" replace />} />
        <Route path="/section/:sectionName" element={<Section />} />
        <Route path="*" element={<p>404 - Page not found</p>} />
      </Routes>
    </Suspense>
  );
}

export default App;

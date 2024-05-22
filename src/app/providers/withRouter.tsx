import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Preloader } from "~/shared/ui";

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Preloader full_screen_mode />}>
        {component()}
      </Suspense>
    </BrowserRouter>
  );

import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "../app/globals.css";
import { BrowserRouter } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import { ToastProvider } from "@/providers/toaster-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Suspense fallback={<div>Loading...</div>}>
		<BrowserRouter>
			<StyleSheetManager shouldForwardProp={(prop) => prop !== "shake"}>
				<App />
				<ToastProvider />
			</StyleSheetManager>
		</BrowserRouter>
	</Suspense>
);

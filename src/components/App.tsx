import { RouterProvider } from "react-router-dom";

import router from "../router/router";

const App = () => {
	return (
		<div className='bg-black text-white'>
			<RouterProvider router={router} />
		</div>
	);
};

export default App;

import { RouterProvider } from "react-router-dom"
import { router } from "./presentation/router/router"

export const OpenReact = () => {
  return (
    <RouterProvider router={router}/>
  )
}

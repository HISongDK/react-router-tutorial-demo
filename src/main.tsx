import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, { action as rootAction, loader as rootLoader } from './routes/root'
import { loader as contactLoader } from './routes/contact'
import { action as editAction } from './routes/edit'
import { action as destroyAction } from './routes/destroy'
import ErrorPage from './error-page'
import Contact from './routes/contact'
import EditContact from './routes/edit'
import Index from './routes'

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            { index: true, element: <Index /> },
            {
                path: 'contacts/:contactId',
                element: <Contact />,
                loader: contactLoader,
            },
            {
                path: 'contacts/:contactId/edit',
                element: <EditContact />,
                loader: contactLoader,
                action: editAction,
            },
            {
                path: 'contacts/:contactId/destroy',
                action: destroyAction,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={routes} />
    </React.StrictMode>,
)

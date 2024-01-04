import {
    Outlet,
    // Link,
    useLoaderData,
    Form,
    redirect,
    NavLink,
    useNavigation,
} from 'react-router-dom'
import { getContacts, createContact } from '../contacts'

// export const loader = (getContacts) => {}
export async function loader() {
    const contacts = await getContacts()
    return { contacts }
}

export async function action() {
    const contact = await createContact()
    return redirect(`contacts/${contact.id}/edit`)
}

export default function Root() {
    const { contacts } = useLoaderData()

    const navigate = useNavigation()

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div id="search-spinner" aria-hidden hidden={true} />
                        <div className="sr-only" aria-live="polite"></div>
                    </form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {/* <ul>
                        <li>
                            <Link to={`/contacts/1`}>Your Name</Link>
                        </li>
                        <li>
                            <Link to={`/contacts/2`}>Your Friend</Link>
                        </li>
                    </ul> */}
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    {/* <Link to={`contacts/${contact.id}`}>
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}
                                        {contact.favorite && <span>★</span>}
                                    </Link> */}
                                    <NavLink
                                        to={`contacts/${contact.id}`}
                                        /**
                                         * isActive 很好理解
                                         * isPending 的时机有点不是很明白，现在可以想到的就是路由 loader 的时间
                                         */
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? 'active'
                                                : isPending
                                                ? 'pending'
                                                : ''
                                        }
                                    >
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}
                                        {contact.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div
                id="detail"
                className={navigate.state === 'loading' ? 'loading' : ''}
            >
                {<Outlet />}
            </div>
        </>
    )
}

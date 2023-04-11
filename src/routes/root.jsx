import { Outlet, NavLink, Link, useLoaderData, Form } from "react-router-dom";
import { getContacts, createContact } from "../contacts";

// Q1: Here, we're passing off loader to the router in main.jsx (effetively index.jsx). Rather than utilizing contacts directly,
// we're integrating contacts into the router so it has an "awareness" of the contacts. I have some question as to where
// loader is invoked. Is it invoked by the router when the default route, (path: "/"). OR, is invoked by const { contacts } = useLoaderData(); below?
export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

export async function action() {
  const contact = await createContact();
  return { contact };
}

export default function Root() {
  const { contacts } = useLoaderData(); // Q1.
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
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                        {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}{" "}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

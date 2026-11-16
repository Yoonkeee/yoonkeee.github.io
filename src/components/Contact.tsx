import { profile } from "@/data/portfolio";
import styles from "./Contact.module.css";

const CONTACTS = [
  { term: "Email", text: profile.email, href: `mailto:${profile.email}` },
  { term: "GitHub", text: profile.github.label, href: profile.github.url },
];

export function Contact() {
  return (
    <footer id="contact" className={styles.contact}>
      <dl className={`container ${styles.list}`}>
        {CONTACTS.map((contact) => (
          <div key={contact.term}>
            <dt>{contact.term}</dt>
            <dd>
              <a className={styles.link} href={contact.href}>
                {contact.text}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </footer>
  );
}

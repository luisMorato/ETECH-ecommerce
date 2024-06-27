import { Link, LinkProps } from "react-router-dom";

interface footerLink extends LinkProps{}

const FooterLink = ({ ...props }: footerLink) => {
  return (
    <li className="hover:-translate-y-2 transition duration-150">
      <Link { ...props }>
        { props.children }
      </Link>
    </li>
  )
}

export default FooterLink;
import { Menu, Container, Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";

function Header() {
  const route = useRouter();
  const user = false;

  React.useEffect(() => {
    route.events.on("routeChangeStart", () => NProgress.start());
    route.events.on("routeChangeComplete", () => NProgress.done());
    route.events.on("routeChangeError", () => NProgress.done());
  }, []);

  const activeMenu = (active) => active === route.pathname;

  return (
    <Menu fluid inverted id={"menu"}>
      <Container text>
        <Link href='/'>
          <Menu.Item active={activeMenu("/")}>
            <Image
              size={"mini"}
              src={"/static/logo.svg"}
              style={{ marginRight: "1rem" }}
            />
            Home
          </Menu.Item>
        </Link>
        <Link href='/cart'>
          <Menu.Item active={activeMenu("/cart")}>
            <Icon name='cart' size='large' />
            Cart
          </Menu.Item>
        </Link>
        {user && (
          <Link href='/create'>
            <Menu.Item active={activeMenu("/create")}>
              <Icon name='add square' size='large' />
              Create
            </Menu.Item>
          </Link>
        )}

        {user ? (
          <>
            <Link href='/account'>
              <Menu.Item active={activeMenu("/account")}>
                <Icon name='user' size='large' />
                Account
              </Menu.Item>
            </Link>
            <Menu.Item header>
              <Icon name='sign out' size='large' />
              Log Out
            </Menu.Item>
          </>
        ) : (
          <>
            <Link href='/login'>
              <Menu.Item active={activeMenu("/login")}>
                <Icon name='sign in' size='large' />
                Login
              </Menu.Item>
            </Link>
            <Link href='/signup'>
              <Menu.Item active={activeMenu("/signup")}>
                <Icon name='signup' size='large' />
                Signup
              </Menu.Item>
            </Link>
          </>
        )}
      </Container>
    </Menu>
  );
}

export default Header;

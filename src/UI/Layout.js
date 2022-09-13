import Navigation from "./Navigation"
import css from './Layout.module.css'

function Layout(props) {
    return (
        <section>
            <Navigation />
            <section className={css.body}>
            {props.children}
            </section>
        </section>
    )
}

export default Layout
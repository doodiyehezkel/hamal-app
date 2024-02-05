import style from './Main.module.css'

export type MainProps = {
    children: React.ReactNode
}

export default function Main(props: MainProps) {
    return (
        <main className={style['main-container']}>
            {props.children}
        </main>
    )
}
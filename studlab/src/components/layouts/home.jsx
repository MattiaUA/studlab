import '../../index.css'
import createPrev from '../../hooks/parsePrev'

export default function Home(props) {
    const {docData, userData} = props

    const prevData = createPrev(docData, userData)
    console.log(prevData)
    return (
        <div>

        </div>
    )
}
import parsePrev from '../../hooks/parsePrev'
import Preview from '../partials/preview'

export default function Home(props) {
    const {docData, userData} = props

    const prevData = parsePrev(docData, userData)
    return (
        <Preview data={prevData[0]} />
    )
}
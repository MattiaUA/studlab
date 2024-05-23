import Preview from './preview';
import parsePrev from '../../hooks/parsePrev'


export default function RelevantFiles(props) {
    const {docData, userData} = props
    
    const prevData = parsePrev(docData, userData)
    return (
        <div className='relevan-files-container'>
            {Array.from({length: 5}).map((_, index) => <Preview key={index} data={prevData[index]}/>)}
        </div>
    );

}
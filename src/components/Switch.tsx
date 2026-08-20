type SwitchType = {
    theme: boolean,
    toggle:boolean,
    onChange: () => void
}

const Switch = ({ theme, onChange, toggle }: SwitchType) => {
    return (
        <div className=''>
            <label className={`switch ${theme ? 'dark' : 'light'} ${toggle ? 'left-0' : 'left-0'} relative`}>
                <input type="checkbox" checked={theme} onChange={onChange} />
                <span className="slider" />
            </label>
        </div>
    );
}


export default Switch;

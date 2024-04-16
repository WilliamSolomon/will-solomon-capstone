import SettingsItem from '../SettingsItem/SettingsItem';
import './SettingsList.scss'
import { useNavigate } from 'react-router-dom';

const SettingsList = ({settingsList, updateTrigger}) => {
    // const navigate = useNavigate();

    // const viewItemDetails = (item) => {
    //     navigate(`/inventory/${item.id}`);
    // }

    return (
        <>
            <section className="settings-list__table">
                {settingsList.length === 0 && <h2 className='settings-list__table--none'>No settings found. Click the Add Alert to a weather condition to monitor.</h2>}
                {!settingsList ? (
                    <h2>Loading...</h2>
                ) : (
                    settingsList.map((item) => {
                        return (
                            <SettingsItem updateTrigger={updateTrigger} key={item.id} item={item} />
                        );
                    })
                )}
            </section>
        </>
    )
}

export default SettingsList;
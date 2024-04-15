import React from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const SymptomBoxes = () => {

    const { t } = useTranslation();

    return (
        <form action="">
            <div className="symptoms-boxes">
            <div className="symptoms-box rgb-blue">
                <div className="sym-title">
                    <h1>General symptoms</h1>
                </div>
                <div className="sym-checkboxes">
                    <div className="sym-checkbox">
                        <input className="check" type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Bad feeling</label>
                        {/* <input type="range" min="-100" max="0" value="0" className="range blue"/> */ }
                    </div>

                    <div className="sym-checkbox">
                        <input className="check" type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Fatigue</label>
                    </div>

                    <div className="sym-checkbox">
                        <input className="check" type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Weight loss</label>
                    </div>

                    <div className="sym-checkbox">
                        <input className="check" type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Overweight</label>
                    </div>

                    <div className="sym-checkbox">
                        <input className="check" type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Sleep disturbance</label>
                    </div>

                    <div className="sym-checkbox">
                        <input className="check" type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Elevated temperature</label>
                    </div>

                    <div className="sym-checkbox">
                        <input className="check" type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Cold and flu</label>
                    </div>

                </div>
            </div>

            <div className="symptoms-box rgb-gray">
                <div className="sym-title">
                    <h1>Head, sight, hearing, speech</h1>
                </div>
                <div className="sym-checkboxes">
                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Bad feeling</label>
                        {/* <input type="range" min="-100" max="0" value="0" className="range blue"/> */ }
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Fatigue</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Weight loss</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Overweight</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Sleep disturbance</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Elevated temperature</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Cold and flu</label>
                    </div>

                </div>
            </div>

            <div className="symptoms-box rgb-blue">
                <div className="sym-title">
                    <h1>Neck and throat</h1>
                </div>
                <div className="sym-checkboxes">
                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Bad feeling</label>
                        {/* <input type="range" min="-100" max="0" value="0" className="range blue"/> */ }
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Fatigue</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Weight loss</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Overweight</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Sleep disturbance</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Elevated temperature</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Cold and flu</label>
                    </div>

                </div>
            </div>

            <div className="symptoms-box rgb-gray">
                <div className="sym-title">
                    <h1>Chest, heart, breath</h1>
                </div>
                <div className="sym-checkboxes">
                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Bad feeling</label>
                        {/* <input type="range" min="-100" max="0" value="0" className="range blue"/> */ }
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Fatigue</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Weight loss</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Overweight</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Sleep disturbance</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Elevated temperature</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Cold and flu</label>
                    </div>

                </div>
            </div>

            <div className="symptoms-box rgb-blue">
                <div className="sym-title">
                    <h1>Exterior surfaces, skin, hair</h1>
                </div>
                <div className="sym-checkboxes">
                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Bad feeling</label>
                        {/* <input type="range" min="-100" max="0" value="0" className="range blue"/> */ }
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Fatigue</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Weight loss</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Overweight</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Sleep disturbance</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Elevated temperature</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Cold and flu</label>
                    </div>

                </div>
            </div>

            <div className="symptoms-box rgb-gray">
                <div className="sym-title">
                    <h1>Limb, joints, back, loin</h1>
                </div>
                <div className="sym-checkboxes">
                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Bad feeling</label>
                        {/* <input type="range" min="-100" max="0" value="0" className="range blue"/> */ }
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Fatigue</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Weight loss</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Overweight</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Sleep disturbance</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Elevated temperature</label>
                    </div>

                    <div className="sym-checkbox">
                        <input type="checkbox" name="bad_feeling"/>
                        <label htmlFor="bad_feeling">Cold and flu</label>
                    </div>

                </div>
            </div>
        </div>

            <div className="sym-button">
                <Link to="/results">
                    <input type="button" value={t("symptomsPage.start")}/>
                </Link>
            </div>
        </form>
    )
};

export default SymptomBoxes;
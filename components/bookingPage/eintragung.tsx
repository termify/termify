import React, { ComponentProps, useState } from 'react';
import { useAuthStore, useBookingStore } from '../../store/stores';
import { TbFiles } from 'react-icons/tb';
import { ImCross } from 'react-icons/im';
import { Modal } from '../shared/modal';
import AuthForm from '../shared/authForm';

export default function Eintragung() {
    return (
        <div className={'p-4 container mx-auto w-2/3'}>
            <Reason />
        </div>
    );
}

function Reason() {
    const setBookingPage = useBookingStore((state) => state.setPageNumber);

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setBookingPage(4);
    }

    return (
        <>
            <div>
                <div className="flex justify-center">
                    <h3
                        className={
                            'text-center font-bold bg-gradient-to-r w-full inline-block from-sky-400 to-emerald-500 text-transparent text-2xl bg-clip-text mx-auto p-4 xl:mb-8 xl:w-1/3 xl:text-4xl '
                        }
                    >
                        Anliegen
                    </h3>
                </div>
                <form className={'flex flex-col items-center gap-4'} onSubmit={submitHandler}>
                    <CustomDropdown heading={'Art des Anliegens'} required>
                        <option>Bitte Anliegen wählen</option>
                    </CustomDropdown>
                    <CustomInput heading={'Dokumenten hochladen'} />
                    <CustomTextArea heading={'Anmerkung'} />
                    <button
                        className={
                            'bg-gradient-to-r from-sky-400 to-emerald-500 shadow-md text-sky-50 p-2 font-bold rounded-md text-2xl mt-8 w-full transition-all hover:scale-110 xl:w-1/3'
                        }
                        title={'Termin buchen'}
                        type={'submit'}
                    >
                        Termin buchen
                    </button>
                </form>
            </div>

            {!isLoggedIn && (
                <Modal>
                    <RequestForLogin />
                </Modal>
            )}
        </>
    );
}

function RequestForLogin() {
    const setPageNumber = useBookingStore((state) => state.setPageNumber);

    function goBackToTermin() {
        setPageNumber(2);
    }

    return (
        <div className={'bg-slate-800/50 w-screen h-screen p-2 xl:p-0'}>
            <div className={'relative bg-slate-50 h-2/3 rounded-xl shadow-xl top-36 p-8 xl:left-1/4 xl:w-1/2'}>
                <div className="flex justify-end">
                    <button
                        title={'Zurück'}
                        className={
                            'p-2 group font-black transition-all rounded hover:xl:scale-110 hover:xl:bg-slate-200'
                        }
                        onClick={goBackToTermin}
                    >
                        <ImCross className={'shadow'} />
                    </button>
                </div>
                <h3 className={'text-center font-bold p-2 text-slate-800 text-xl xl:text-3xl'}>
                    Bitte loggen Sie sich für eine Buchung ein
                </h3>
                <AuthForm authType={'login'} />
            </div>
        </div>
    );
}

interface CustomTextAreaProps extends ComponentProps<'textarea'> {
    heading: string;
}

function CustomTextArea(props: CustomTextAreaProps) {
    return (
        <div className={'flex flex-col w-full xl:w-1/3'}>
            <label className={'p-2 font-bold text-center xl:text-start'}>{props.heading}:</label>
            <textarea
                className={
                    'border-2 rounded-lg border-slate-800 shadow-md  resize-y p-2 min-h-[50px] w-full max-w-[500px]'
                }
                {...props}
            />
        </div>
    );
}

interface CustomDropdown extends ComponentProps<'select'> {
    heading: string;
}

function CustomDropdown(props: CustomDropdown) {
    return (
        <div className={'flex flex-col w-full xl:w-1/3'}>
            <label className={'p-2 font-bold text-center xl:text-start '}>{props.heading}:</label>
            <select
                className={
                    'border-2 rounded-lg border-slate-800 shadow-md  bg-white resize-y p-2 min-h-[50px] w-full max-w-[500px]'
                }
                {...props}
            >
                {props.children}
            </select>
        </div>
    );
}

interface CustomInputProps extends ComponentProps<'input'> {
    heading: string;
}

function CustomInput(props: CustomInputProps) {
    return (
        <div className={'flex flex-col w-full  xl:w-1/3'}>
            <label className={'p-2 font-bold'}>{props.heading}:</label>
            <label
                className={
                    'w-full h-32 border-2 border-slate-800 shadow-md rounded-lg hover:bg-slate-200 hover:cursor-pointer'
                }
            >
                <div className={' h-full flex flex-col justify-center items-center'}>
                    <TbFiles className={'w-16 h-16'} />
                    <p className={'font-bold text-center xl:text-start'}>Klicken um Dateien hochzuladen</p>
                </div>
                <input className={'hidden'} type={'file'} {...props} />
            </label>
        </div>
    );
}

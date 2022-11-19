export default function Eintragung({ onClick }: any) {
    return (
        <form>
            <PersonalData />
        </form>
    );
}

function PersonalData() {
    return (
        <div>
            <h3>Persönliche Daten</h3>
            <InputField />
        </div>
    );
}

function InputField() {
    return (
        <div>
            <label>Vorname</label>
            <input placeholder="holder" />
        </div>
    );
}

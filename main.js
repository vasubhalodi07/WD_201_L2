let userForm = document.getElementById("user_form");

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
};

let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries
        .map((entry) => {
            const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
            const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
            const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
            const dobCell = `<td class='border px-4 py-2'>${entry.date}</td>`;
            const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptTerms}</td>`;

            const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
            return row;
        })
        .join("\n");

    const table = `<table class='table-auto w-full'><tr>
    <th class='px-4 py-2'>Name</th>
    <th class='px-4 py-2'>Email</th>
    <th class='px-4 py-2'>Password</th>
    <th class='px-4 py-2'>Dob</th>
    <th class='px-4 py-2'>Accepted terms?</th>
    </tr>
    ${tableEntries}
    </table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
};

let saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob");
    const acceptTerms = document.getElementById("acceptTerms").checked;

    let date = dob.value;

    const entry = {
        name,
        email,
        password,
        date,
        acceptTerms,
    };

    userEntries.push(entry);

    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
};
userForm.addEventListener("submit", saveUserForm);
displayEntries();
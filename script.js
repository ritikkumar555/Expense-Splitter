const BADGE_COLORS = ['#2F6B4F', '#3D5A80', '#8C5E58', '#6A7B76'];


const addMemberForm = document.querySelector("#add-member-form");

const MEMBERS_LOCALSTORAGE_KEY = "members";

function getItems(key)
{
    return JSON.parse(localStorage.getItem(key)) || [];
}

function setItems(key, item)
{
    localStorage.setItem(key, JSON.stringify(item));
}

addMemberForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const value = document.querySelector("#member-name-input").value.trim();

    if(!value)
    {
        return;
    }

    let members = getItems(MEMBERS_LOCALSTORAGE_KEY);

    setItems(MEMBERS_LOCALSTORAGE_KEY, [...members, {name : value, id : `mem_${Date.now()}`}]);

    document.querySelector("#member-name-input").value = "";
    // console.log(value);
    renderMembers();
})


function renderMembers()
{
    const membersList = document.querySelector("#members-list");
    membersList.innerHTML = "";

    let members = getItems(MEMBERS_LOCALSTORAGE_KEY);

    if(!members.length)
    {
        document.querySelector("#members-empty").classList.remove("hidden");
        membersList.classList.add("hidden");
        return;
    }

    members.forEach(({id, name}) => {

    const li = document.createElement("li");

    li.innerHTML = `
                    <li class="flex items-center justify-between py-2.5 px-1 hover:bg-slate-100/50 transition-colors gap-2">
                        <div class="flex items-center gap-3 min-w-0 flex-1">
                        <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-medium text-white shrink-0 select-none" style="background-color: #2F6B4F;">
                        ${name[0].toUpperCase()}
                        </span>
                        <span class="font-sans text-sm font-medium text-ledger-ink truncate break-words">${name}</span>
                        </div>
                        <button type="button" class="remove-member-btn text-ledger-muted hover:text-ledger-rust p-2 rounded-sm transition-colors cursor-pointer shrink-0 ml-2 min-w-[36px] min-h-[36px] flex items-center justify-center" data-id="m_1" title="Remove ram" aria-label="Remove ram">
                        <svg class="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                    </li>`

    membersList.append(li);
    })
}

renderMembers();


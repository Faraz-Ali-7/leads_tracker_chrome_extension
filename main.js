const savebtn = document.getElementById("input-btn");
const inputel = document.getElementById("input-el");
const ulel = document.getElementById("leads-list");
const delBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

let myLeads = [];

function renderLeads(leadArr){
    let listItems = "";

    for(let i = 0; i< leadArr.length; i++)
    {
        listItems += `<li>
                        <a href = "${leadArr[i]}" target = "_blank"> ${leadArr[i]} </a>
                    </li>`;
    }

    ulel.innerHTML += listItems;
}

function renderNewLead(new_lead){
    let listItems = "";

    listItems = `<li>
                     <a href = "${new_lead}" target = "_blank"> ${new_lead} </a>
                </li>`;

    ulel.innerHTML += listItems;
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
}

function loadLeads()
{
    myLeads = JSON.parse(localStorage.getItem("myLeads")) || [];
    if(myLeads){
        renderLeads(myLeads);
    }
}

savebtn.addEventListener("click", function() {
    if(inputel.value)
    {
        myLeads.push(inputel.value);
        renderNewLead(inputel.value);
        inputel.value = "";
    }
});

delBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    ulel.innerHTML = "";
});

tabBtn.addEventListener("click", function() {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        renderNewLead(tabs[0].url); 
    });
    
});

loadLeads();
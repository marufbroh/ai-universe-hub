const loadTools = async () =>{
    const URL = 'https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(URL);
    const data = await res.json();
    displayTools(data.data.tools)
}

const displayTools = (tools) =>{
    const toolsContainer = document.getElementById('tools-container')
    tools.forEach(tool => {
        console.log(tool)
        toolsContainer.innerHTML += `
        <div class="col">
        <div class="card h-100 p-2 shadow border-0">
            <img src="${tool.image}" class="card-img-top img-fluid img-thumbnail h-50" alt="">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol class="list-group p-3">
                    <li>${tool.features[0]}</li>
                    <li>${tool.features[1]}</li>
                    <li>${tool.features[2]}</li>
                </ol>
                <hr>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title">${tool.name}</h5>
                        <div class="d-flex gap-2  align-items-center">
                            <i class="fa-solid fa-calendar-days"></i>
                            <p class="card-text">${tool.published_in}</p>
                        </div>
                    </div>
                    <div style="width: 50px;"><i class="fa-solid fa-circle-arrow-right"></i></div>
                </div>
            </div>
        </div>
    </div>
        `
    });
}

loadTools()
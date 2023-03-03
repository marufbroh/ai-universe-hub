const loadTools = async () => {
    const URL = 'https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(URL);
    const data = await res.json();
    displayTools(data.data.tools)
}

const displayTools = (tools) => {
    const toolsContainer = document.getElementById('tools-container')
    tools.forEach(tool => {
        // console.log(tool)
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
                    <div onclick ="loadToolsDetails('${tool.id}')" style="width: 50px;" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-circle-arrow-right"></i></div>
                </div>
            </div>
        </div>
    </div>
        `
    });
}


const loadToolsDetails = async (id) => {
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(URL);
    const data = await res.json();
    displayToolsDetails(data.data)
}


const displayToolsDetails = (data) => {
    // console.log(data)
    const toolsModalBody = document.getElementById('tools-motal-body');
    toolsModalBody.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col">
        <div class="card h-100 bg-dark bg-gradient bg-opacity-10">
            <div class="card-body p-3">
                <h5 class="card-title">ChatGPT is an AI-powered chatbot platform that uses OpenAI's GPT technology to simulate human conversation.</h5>
                <div class="d-flex justify-content-center align-items-center gap-2 fw-semibold text-center">
                    <div class="bg-light rounded text-success"><span>$10/month Basic</span></div>
                    <div class="bg-light rounded text-warning"><span>$10/month Basic</span></div>
                    <div class="bg-light rounded text-danger"><span>$10/month Basic</span></div>
                </div>

                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="card-title">Features</h5>
                        <ul></ul>

                    </div>
                    <div>
                        <h5 class="card-title">Integrations</h5>
                        <ul></ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card h-100 text-center">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Hi, how are you doing today?</h5>
                <p class="card-text">I'm doing well, thank you for asking. How can I assist you today?</p>
            </div>
        </div>
    </div>
</div>
    `
}

loadTools()
const loadTools = async () => {
    const URL = 'https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(URL);
    const data = await res.json();
    displayTools(data.data.tools)
    
}

const displayTools = (tools) => {
    toggleSpinner(true)
    const toolsContainer = document.getElementById('tools-container')
    if(tools.length> 6){
        tools = tools.slice(0, 6)
    }

    tools.forEach(tool => {
        // console.log(tool)
        toolsContainer.innerHTML += `
        <div class="col">
        <div class="card h-100 p-2 shadow border-0">
            <img src="${tool.image}" class="card-img-top img-fluid img-thumbnail h-50" alt="">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol class="list-group p-3"></ol>
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

    toggleSpinner(false)
}


// const createItems =(listArray) => {
// const ol = document.getElementsByTagName('ol')
// // console.log(ol)
// listArray.forEach(list =>{
//     ol.innerHTML +=`<li>${list}</li>`
// })

// }


const toggleSpinner = isLoading => {
    const spinnerSec = document.getElementById('spinner');
    if (isLoading) {
        spinnerSec.classList.add('d-none')
    }
}


const loadToolsDetails = async (id) => {
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(URL);
    const data = await res.json();
    displayToolsDetails(data.data)
}


const displayToolsDetails = (tool) => {
    console.log(tool)
    const {description, pricing, image_link, input_output_examples} = tool
    const toolsModalBody = document.getElementById('tools-motal-body');
    toolsModalBody.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col">
        <div class="card h-100 bg-dark bg-gradient bg-opacity-10">
            <div class="card-body p-3">
                <h5 class="card-title">${description}</h5>
                <div class="d-flex justify-content-center align-items-center gap-2 fw-semibold text-center">
                    <div class="bg-light rounded text-success">
                    <span>${pricing[0].price} ${pricing[0].plan}</span>
                    </div>
                    <div class="bg-light rounded text-warning"><span>${pricing[1].price} ${pricing[1].plan}</span></div>
                    <div class="bg-light rounded text-danger"><span>${pricing[2].price} ${pricing[2].plan}</span></div>
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
            <img src="${image_link[0]}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${input_output_examples? input_output_examples[0].input : 'Can you give any example?'}</h5>
                <p class="card-text">${input_output_examples? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
            </div>
        </div>
    </div>
</div>
    `
}

loadTools()
const api = 'https://raw.githubusercontent.com/deniztadice/api/main/adv.json'


const getAdventures = async (api) => {
    let adventures = []
    let data = await fetch(api).then((res) => res.json())
    for (const key in data) {
        const adventureUrl = data[key]
        await fetch(adventureUrl).then((res)=> res.json()).then((data)=>adventures.push(data))        
      }
    const content = adventures.map(adventure=>{
        return `<li>${adventure.title}</li>`
        }).join('')
        //console.log(adventures)
    return adventures
}
//console.log(adventures)
const adventures = await getAdventures(api)
        
// console.log(content)

let advDialog =  new foundry.applications.api.DialogV2({
    window: { title: 'title' },
    content: adventures,
    buttons: [{
        action: 'ok',
        label: 'ok'
      }, {
        action: 'dontShowMe',
        label: 'dontShowMe',
        default: true
      }],
      submit: result => {
          console.log('result')
      }
  });

  advDialog.render({ force: true })
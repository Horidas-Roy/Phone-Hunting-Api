const loadPhone = async(searchText='13',isShowAll) =>{
    const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
     const data = await res.json()
     const phones=data.data;
    //  console.log(phones)
     displayPhones(phones,isShowAll);
}

const displayPhones = (phones,isShowAll) => {

        const phoneContainer=document.getElementById('phone-container');
        // clear phone container befor new card
        phoneContainer.innerText=''
        
        // display show all button if there are more than 12 phones

        const showAllContainer=document.getElementById('show-all-container')
        // console.log(phones.length)
        if(phones.length>12 && !isShowAll){
            showAllContainer.classList.remove('hidden');
        }
        else{
            showAllContainer.classList.add('hidden');
        }
         

        // console.log('is show all',isShowAll)
        // display only first 12 phones if not show all
        if(!isShowAll){
            phones=phones.slice(0,12);
        }

        phones.forEach(phone => {
            //  console.log(phone);
             const phoneCard=document.createElement('div');
             phoneCard.classList=`card p-4 bg-base-100 shadow-xl text-center`;
             phoneCard.innerHTML=`
                <figure><img src=${phone.image} /></figure>
                <div class="card-body">
                <h2 class="card-title inline-block mx-auto">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                    <button onclick='handleShowDetails("${phone.slug}")' class="btn btn-primary">Show Details</button>
                </div>
                </div>
             
             `
             phoneContainer.appendChild(phoneCard);
        });

        toggleLoadingSpinner(false);
}

const handleShowDetails = async(id)=>{
    console.log("click show details   ",id)

    // load single data
    const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data=await res.json();
    const phone=data.data
    console.log(phone)

   showPhoneDetails(phone);

}

const showPhoneDetails =(phone)=>{
      const phnName=document.getElementById('show-detail-phone-name')
      phnName.innerText=phone.name;

      const showDetailContainer=document.getElementById('show-details-container');
      showDetailContainer.innerHTML=`
           <img src='${phone.image}'/>
           <p>Storage:${phone?.mainFeatures?.storage
           }
      `

    show_details_modal.showModal()
}

// handle search button

const handleSearch=(isShowAll)=>{
    toggleLoadingSpinner(true);
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    // console.log(searchText);
    loadPhone(searchText,isShowAll)
}

const handleSearch2=()=>{
    toggleLoadingSpinner(true); 
    const searchField=document.getElementById('search-field2');
    const searchText=searchField.value;
    // console.log(searchText);
    loadPhone(searchText)
}

loadPhone()

const toggleLoadingSpinner = (isLoading) =>{
    const LoadSpinner=document.getElementById('loading-spinner');
         if(isLoading === true){
            LoadSpinner.classList.remove('hidden');
         }
         else{
            LoadSpinner.classList.add('hidden');
         }
}

// handle showAll btn

const handleShowAll =()=>{
    handleSearch(true);
}
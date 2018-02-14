var User = {
    id: '',
    name:'',
    age: '',
    gender:'',
    preferGender:'',
    email:'',
    profileImageUrl:'',
    yaleAffiliation:'',
    password:'',
    description: '',
}

var ageDropdownOptions = [
    {key: "18",
    value: "18",
    text: "18"}, 
    {key: "19",
    value: "19",
    text: "19"}, 
    {key: "20",
    value: "20",
    text: "20"}, 
    {key: "21",
    value: "21",
    text: "21"}, 
    {key: "22",
    value: "22",
    text: "22"}, 
    {key: "23",
    value: "23",
    text: "23"}, 
    {key: "24",
    value: "24",
    text: "24"}, 
    {key: "25",
    value: "25",
    text: "25"}, 
    {key: "26",
    value: "26",
    text: "26"}, 
    {key: "27",
    value: "27",
    text: "27"}, 
    {key: "28",
    value: "28",
    text: "28"},
    {key: "29",
    value: "29",
    text: "29"},
    {key: "30",
    value: "30",
    text: "30"},
    {key: "31",
    value: "31",
    text: "31"}, 
    {key: "32",
    value: "32",
    text: "32"},
    {key: "33",
    value: "33",
    text: "33"}, 
    {key: "34",
    value: "34",
    text: "34"}, 
    {key: "35",
    value: "35",
    text: "35"}, 
    {key: "36",
    value: "36",
    text: "36"}, 
    {key: "37",
    value: "37",
    text: "37"}, 
    {key: "38",
    value: "38",
    text: "38"}, 
    {key: "39",
    value: "39",
    text: "39"}
]

var genderDropdownOptions = [
    {key: "male",
    value: "male",
    icon: "man",
    text: "Male"}, 
    {key: "female",
    value: "female",
    icon: "woman",
    text: "Female"},
    {key: "other",
    value: "other",
    icon: "other gender",
    text: "Other"}]

var yaleAffiliationDropdownOptions = [
    {key: "school of management",
    value: "school of management",
    text: "Yale School of Management"},
    {key: "school of law",
    value: "school of law",
    text: "Yale Law School"},
    {key: "yale college",
    value: "yale college",
    text: "Yale College"},
    {key: "other",
    value: "other",
    text: "Other"},
]

var yaleGraduationDropdownOptions = []
for (var i=2018; i<=2024; i++){
    yaleGraduationDropdownOptions.push({
        key: i,
        value: i,
        text: i
    });
}

var yaleInterestedJobsDropdownOptions = [
    {
        key: "app development",
        value: "app development",
        text: "App Development"
    },
    {
        key: "web development",
        value: "web development",
        text: "Web Development"
    },
    {
        key: "graphic design",
        value: "graphic design",
        text: "Graphic Design"
    },
    {
        key: "taxes",
        value: "taxes",
        text: "Taxes"
    },
    {
        key: "consulting interview prep",
        value: "consulting interview prep",
        text: "Consulting Interview Prep"
    },
    {
        key: "banking interview prep",
        value: "banking interview prep",
        text: "Banking Interview Prep"
    },
]

export default User;
export {genderDropdownOptions, 
        yaleAffiliationDropdownOptions, 
        yaleGraduationDropdownOptions,
        yaleInterestedJobsDropdownOptions,
        ageDropdownOptions};
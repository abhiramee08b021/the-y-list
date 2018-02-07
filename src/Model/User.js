var User = {
    id: '',
    name:'',
    gender:'',
    preferGender:'',
    email:'',
    profileImageUrl:'',
    yaleAffiliation:'',
    password:'',
}

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
        yaleInterestedJobsDropdownOptions};
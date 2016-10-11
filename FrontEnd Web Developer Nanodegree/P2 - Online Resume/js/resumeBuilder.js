var bio = {
    "name": "Manish Bisht",
    "role": "Front-End Web Developer",
    "contacts": {
        "mobile": "+91-8559874393",
        "email": "hi@manishbisht.me",
        "github": "manishbisht",
        "twitter": "ManishBisht02",
        "location": "Jaipur, Rajasthan (India)"
    },
    "welcomeMessage": "Hi, I am Manish Bisht",
    "skills": ["Coding", "Competitive Programing", "Open Source", "Hard Working"],
    "biopic": "images/icon.jpg",
    "display": function () {
        var role = HTMLheaderRole.replace("%data%", bio.role);
        $('#header').prepend(role);
        var name = HTMLheaderName.replace("%data%", bio.name);
        $('#header').prepend(name);
        var mobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
        $('#topContacts').append(mobile);
        $('#footerContacts').append(mobile);
        var email = HTMLemail.replace("%data%", bio.contacts.email);
        $('#topContacts').append(email);
        $('#footerContacts').append(email);
        var twitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
        $('#topContacts').append(twitter);
        $('#footerContacts').append(twitter);
        var github = HTMLgithub.replace("%data%", bio.contacts.github);
        $('#topContacts').append(github);
        $('#footerContacts').append(github);
        var mylocation = HTMLlocation.replace("%data%", bio.contacts.location);
        $('#topContacts').append(mylocation);
        $('#footerContacts').append(mylocation);
        var picture = HTMLbioPic.replace("%data%", bio.biopic);
        $('#header').append(picture);
        var welcomemsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
        $('#header').append(welcomemsg);
        $('#header').append(HTMLskillsStart);
        for (var i = 0; i < bio.skills.length; i++) {
            var skill = HTMLskills.replace("%data%", bio.skills[i]);
            $('#skills').append(skill);
        }
    }
};
bio.display();

var work = {
    "jobs": [
        {
            "employer": "Run4Offers.com",
            "title": "Founder/CEO",
            "location": "Jaipur, Rajasthan",
            "dates": "July 2015- December 2015",
            "description": "Created the online shopping portal with 2 friends to provide a free recharge on all shopping orders made on partner sites Amazon, Flipkart, Snapdeal, Jabong, Paytm and many more.This website has reached 15k views in just 2 months after launching."
        },
        {
            "employer": "Bluecube Network",
            "title": "Intern",
            "location": "Jaipur, Rajasthan",
            "dates": "May 2016- June 2016",
            "description": "Designed the admin dashboard for https://www.perfmon.io/"
        }
    ],
    "display": function () {
        $('#workExperience').append(HTMLworkStart);
        for (var i = 0; i < work.jobs.length; i++) {
            var workEmployer = HTMLworkEmployer.replace("%data%", work.jobs[i].employer);
            $('.work-entry').append(workEmployer);
            var workTitle = HTMLworkTitle.replace("%data%", work.jobs[i].title);
            $('.work-entry').append(workTitle);
            var workDates = HTMLworkDates.replace("%data%", work.jobs[i].dates);
            $('.work-entry').append(workDates);
            var workLocation = HTMLworkLocation.replace("%data%", work.jobs[i].location);
            $('.work-entry').append(workLocation);
            var workDescription = HTMLworkDescription.replace("%data%", work.jobs[i].description);
            $('.work-entry').append(workDescription);
        }
    }
};
work.display();

var projects = {
    "projects": [
        {
            "title": "To-Do List",
            "dates": "February 2016",
            "description": "This task was given to me for the HackerEarth FrontEnd Internship (Online Round). Two panes - one is to-do pane and the other is completed tasks pane.",
            "images": ["images/project1.jpg"]
        },
        {
            "title": "Profile Reader",
            "dates": "January 2016",
            "description": "Designed an Web Application that takes the name of the person from the user and tells you the details of the user using the Google WEB Speech API.",
            "images": ["images/project2.jpg"]
        },
        {
            "title": "C Programmer",
            "dates": "March 2015",
            "description": "Designed an Android Application for learning of C language with the presence of ease. Built using Android Studio.",
            "images": ["images/project3.png"]
        }
    ],
    "display": function () {
        $('#projects').append(HTMLprojectStart);
        for (var i = 0; i < projects.projects.length; i++) {
            var projectTitle = HTMLprojectTitle.replace("%data%", projects.projects[i].title);
            $('.project-entry').append(projectTitle);
            var projectDates = HTMLprojectDates.replace("%data%", projects.projects[i].dates);
            $('.project-entry').append(projectDates);
            var projectDescription = HTMLprojectDescription.replace("%data%", projects.projects[i].description);
            $('.project-entry').append(projectDescription);
            for (var j = 0; j < projects.projects[i].images.length; j++) {
                var projectImage = HTMLprojectImage.replace("%data%", projects.projects[i].images[j]);
                $('.project-entry').append(projectImage);
            }
        }
    }
};
projects.display();

var education = {
    "schools": [
        {
            "name": "Swami Keshvanand Institute of Technology Management & Gramothan",
            "location": "Jaipur, Rajasthan",
            "degree": "B.Tech in Information Technology",
            "majors": ["Computer Science/Information Technology"],
            "dates": "August 2014 - May 2018",
            "url": "http://www.skit.ac.in/"
        },
        {
            "name": "Defence Public School",
            "location": "Jaipur, Rajasthan",
            "degree": "IX-XII",
            "majors": ["Higher and Higher Secondary Education"],
            "dates": "April 2010 - March 2014",
            "url": "http://defencejp.com/"
        }
    ],
    "onlineCourses": [
        {
            "title": "Front-End Nanodegree",
            "school": "Udacity",
            "dates": "October 2016",
            "url": "https://www.udacity.com/"
        }
    ],
    "display": function () {
        $('#education').append(HTMLschoolStart);
        for (var i = 0; i < education.schools.length; i++) {
            var schoolName = HTMLschoolName.replace("%data%", education.schools[i].name);
            schoolName = schoolName.replace("#", education.schools[i].url);
            $('.education-entry').append(schoolName);
            var schoolDegree = HTMLschoolDegree.replace("%data%", education.schools[i].degree);
            $('.education-entry').append(schoolDegree);
            var schoolDates = HTMLschoolDates.replace("%data%", education.schools[i].dates);
            $('.education-entry').append(schoolDates);
            var schoolLocation = HTMLschoolLocation.replace("%data%", education.schools[i].location);
            $('.education-entry').append(schoolLocation);
            for (var j = 0; j < education.schools[i].majors.length; j++) {
                var schoolMajor = HTMLschoolMajor.replace("%data%", education.schools[i].majors[j]);
                $('.education-entry').append(schoolMajor);
            }
        }
        $('.education-entry').append(HTMLonlineClasses);
        for (var i = 0; i < education.onlineCourses.length; i++) {
            var onlineTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[i].title);
            $('.education-entry').append(onlineTitle);
            var onlineSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[i].school);
            $('.education-entry').append(onlineSchool);
            var onlineDates = HTMLonlineDates.replace("%data%", education.onlineCourses[i].dates);
            $('.education-entry').append(onlineDates);
            var onlineURL = HTMLonlineURL.replace("%data%", education.onlineCourses[i].url);
            $('.education-entry').append(onlineURL);
        }
    }
};
education.display();
import { SololearnDao } from "../../../../dao/sololearn/sololearn-dao";

const axios = require("axios");

jest.mock("axios");

describe("SololearnDao.getXPForUser", () => {

    const validUserId = '6599010';
    const invalidUserId = '-1';

    test("it returns the correct xp when called with a valid userid", async () => {

        // arrange
        const data = `


        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta name="description" content="Josef F&#252;rlinger&#39;s  Profile on SoloLearn">
            <meta name="keywords" content="Josef F&#252;rlinger&#39;s  Profile on SoloLearn">
            <title>Josef F&#252;rlinger&#39;s  Profile on SoloLearn</title>
        
            <link rel="shortcut icon" href="/Images/favicon.ico">
            <link rel="icon" type="image/png" href="/Images/favicon-192x192.png" sizes="192x192" style="background-color: white;">
            <link rel="apple-touch-icon" sizes="180x180" href="/Images/favicon-180x180.png" style="background-color: white;">
        
            
        
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
            <link href="/Styles/Base?v=sgOnV5tZ51wxrxXuDwCNFEOJkAyZUDkvm1ksGIiF7Ak1" rel="stylesheet"/>
        
            
            
            <meta property="og:site_name" content="SoloLearn">
            <meta property="og:title" content="Josef F&#252;rlinger">
            <meta property="og:description" content="Check out Josef F&#252;rlinger's Profile on SoloLearn">
            <meta property="og:image" content="https://www.sololearn.com/Icons/Avatars/6599010.jpg" />
            <meta property="og:locale" content="en_us">
            <meta property="og:url" content="https://www.sololearn.com/Profile/6599010/">
            <meta property="fb:app_id" content="153040644900826">
        
                <meta http-equiv="cache-control" content="max-age=0" />
                <meta http-equiv="cache-control" content="no-cache" />
                <meta http-equiv="expires" content="0" />
                <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
                <meta http-equiv="pragma" content="no-cache" />
            
            <link href="/Styles/User?v=pEG8lKwdtKvgSJsoQoM7WUiBzAO7mLLPQwmURD2HaYU1" rel="stylesheet"/>
        
            <link href="/Content/userCodes.css" rel="stylesheet"/>
        
        
        
        </head>
        <body class="">
        
        
            <div id="header">
            <div class="header wrapper">
                <div class="sandwichButton"></div>
                <div class="logo">
                    <a href="/">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 330 60" enable-background="new 0 0 330 60" xml:space="preserve">
                        <g>
                        <g>
                        <g>
                        <g>
                        <path fill="#FDFDFE" d="M120.8,4c-6.8,2.2-13.9,8.4-13,15.4c0,8,8,14.2,15.9,16.8c-6.2-7.1-10.6-15.9-6.7-25.6
                                                C118.8,6.5,120.8,4,120.8,4z" />
                                        </g>
                        <g>
                        <path fill="#FDFDFE" d="M106.1,21.3c-2.7,7-0.1,15.8,5.2,19.4c7.1,5.3,16.8,2.7,23.9-3.5c-9.7,1.8-20.3,0-25.7-8.7
                                                C107.1,24.4,106.1,21.3,106.1,21.3z" />
                                        </g>
                        <g>
                        <path fill="#FDFDFE" d="M112.5,43.4c4.9,6,13.8,8.5,20.9,5.8c4.8-1.9,8.4-7.1,9.2-13c0.5-3-0.1-5.5-0.5-8.5
                                                c-3.5,9.7-11.4,16.5-21.6,17C115.8,44.4,112.5,43.4,112.5,43.4z" />
                                        </g>
                        <g>
                        <path fill="#FDFDFE" d="M136.4,49.6c7.7-1.9,15.6-9,15.6-16.9c0-5.3-5.5-14.8-15.9-16.8c7.1,7.1,11.5,18.6,5.4,27.5
                                                C138.8,47.3,136.4,49.6,136.4,49.6z" />
                                        </g>
                        <g>
                        <path fill="#FDFDFE" d="M153.5,30.5c1.1-7.6-0.7-17.3-7.7-20.9c-4.4-2.7-17.3-0.1-21.2,7.1c8.9-3.5,20.3-2.7,25.7,6.8
                                                C152.6,27.4,153.5,30.5,153.5,30.5z" />
                                        </g>
                        <g>
                        <path fill="#FDFDFE" d="M144.3,7.1c-5.6-4.5-14.4-7.1-20.6-2.7c-7.1,4.4-8.8,14.1-4.4,22.1c0.9-9.7,8-17.7,17.4-19.4
                                                C141.1,6.6,144.3,7.1,144.3,7.1z" />
                                        </g>
                                    </g>
                        <g>
                        <path fill="#FDFDFE" d="M24.4,37.1c0-1.8-0.7-3.3-2-4.6c-1.3-1.2-3.6-2.3-6.9-3.1c-4.1-1-7.3-2.5-9.6-4.5c-2.3-2-3.4-4.4-3.4-7.4
                                            c0-3.1,1.2-5.8,3.7-7.9c2.5-2.1,5.7-3.1,9.6-3.1c4.2,0,7.6,1.2,10.1,3.6c2.5,2.4,3.7,5.2,3.7,8.4l-0.1,0.2h-5.2
                                            c0-2.3-0.8-4.2-2.4-5.7c-1.6-1.5-3.6-2.2-6.1-2.2c-2.5,0-4.5,0.6-5.8,1.8c-1.4,1.2-2,2.8-2,4.8c0,1.7,0.7,3.2,2.2,4.4
                                            c1.5,1.2,3.9,2.2,7.2,3.1c4,1,7.1,2.6,9.2,4.6c2.1,2,3.2,4.6,3.2,7.6c0,3.2-1.3,5.8-3.8,7.8c-2.5,2-5.9,2.9-10,2.9
                                            c-3.9,0-7.3-1.1-10.3-3.3c-3-2.2-4.4-5.1-4.3-8.7l0.1-0.2h5.2c0,2.5,1,4.5,2.9,5.8c1.9,1.4,4.1,2.1,6.5,2.1
                                            c2.6,0,4.6-0.6,6.1-1.7C23.6,40.6,24.4,39.1,24.4,37.1z" />
                        <path fill="#FDFDFE" d="M68.1,30.7c0,4.9-1.5,9-4.6,12.2c-3,3.2-7,4.9-11.8,4.9c-4.7,0-8.5-1.6-11.4-4.9
                                            c-2.9-3.2-4.4-7.3-4.4-12.2v-7.1c0-4.9,1.5-9,4.4-12.2c2.9-3.3,6.7-4.9,11.4-4.9c4.9,0,8.8,1.6,11.8,4.9c3,3.2,4.6,7.3,4.6,12.2
                                            V30.7z M62.7,23.5c0-3.7-1-6.7-3-9c-2-2.4-4.6-3.5-8-3.5c-3.2,0-5.7,1.2-7.6,3.5c-1.9,2.4-2.8,5.4-2.8,9v7.2
                                            c0,3.7,0.9,6.7,2.8,9.1c1.9,2.4,4.4,3.5,7.6,3.5c3.4,0,6-1.2,8-3.5c2-2.3,3-5.4,3-9.1V23.5z" />
                        <path fill="#FDFDFE" d="M81.4,43H101v4.2H76V7.1h5.4V43z" />
                        <path fill="#FDFDFE" d="M168.6,43h19.6v4.2h-25V7.1h5.4V43z" />
                        <path fill="#FDFDFE" d="M216.1,28.6h-16.5V43h19.3v4.2h-24.7V7.1h24.4v4.3h-19v13h16.5V28.6z" />
                        <path fill="#FDFDFE" d="M246,36.9h-15.1l-3.6,10.3h-5.5l14.5-40.1h4.7l14.2,40.1h-5.5L246,36.9z M232.5,32.3h12l-5.8-17.2h-0.2
                                            L232.5,32.3z" />
                        <path fill="#FDFDFE" d="M266.4,29.8v17.4H261V7.1h13.7c4.4,0,7.7,1,10.1,2.9c2.3,1.9,3.5,4.8,3.5,8.5c0,2.1-0.5,3.9-1.6,5.4
                                            c-1.1,1.5-2.6,2.7-4.7,3.6c2.2,0.7,3.8,1.9,4.8,3.5c1,1.6,1.4,3.6,1.4,6v3.8c0,1.2,0.1,2.4,0.4,3.4c0.3,1,0.8,1.8,1.4,2.4v0.7
                                            h-5.6c-0.7-0.6-1.2-1.5-1.4-2.8c-0.2-1.2-0.3-2.5-0.3-3.7V37c0-2.2-0.6-3.9-1.9-5.2c-1.3-1.3-3-2-5.1-2H266.4z M266.4,25.5h7.7
                                            c3.1,0,5.3-0.6,6.6-1.8c1.3-1.2,2-2.9,2-5.3c0-2.3-0.7-4-2-5.3c-1.3-1.2-3.4-1.9-6.1-1.9h-8.3V25.5z" />
                        <path fill="#FDFDFE" d="M327.3,47.2h-5.4l-19.3-30.7l-0.2,0.1v30.6h-5.4V7.1h5.4l19.3,30.6l0.2-0.1V7.1h5.4V47.2z" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </a>
                </div>
                <div class="navigation-menu">
                    <ul class="User">
                        <!-- Getting From DB -->
                        <li id="courses">
                            <a href="/Courses/">COURSES</a>
                        </li>
                        <li id="codes">
                            <a href="/Codes/">CODE PLAYGROUND</a>
                        </li>
                        <li id="discuss">
                            <a href="/Discuss/">DISCUSS</a>
                        </li>
                        <li id="leaders">
                            <a href="/Leaderboard/">TOP LEARNERS</a>
                        </li>
                        <li id="blogPage">
                            <a href="/Blog/">BLOG</a>
                        </li>
                        <li class="signin">
                            <a href="/Profile/">PROFILE</a>                    
                        </li>
                    </ul>
                </div>
            </div>
        </div>
              
        
        <div class="wrapper pageLayout  User">
            <div class="content">
                
        
        
        <div class="block">
            <div class="userProfile   current">
            <div class="user">        
                <div class="avatar">
                        <img src="https://api.sololearn.com/Uploads/Avatars/6599010.jpg" alt="Josef F&#252;rlinger" />
                </div>
                <div class="details">
                    <h1 class="name ">
                        Josef F&#252;rlinger
                    </h1>
                    <div class="detail">
                        <div>
                            <label>Level</label>
                            1
                        </div>
                            <div>
                                <span>40 XP</span>
                            </div>
                    </div>            
                        <a class="materialButton elevated" href="/User/Logout">Sign out</a>
                        <a class="materialButton primary elevated" href="/User/Edit">Edit Profile</a>
                </div>
                <div class="socialOutline">
        
                    <div class="facebookShare">
                        <div class="fb-share-button" data-href="https://www.sololearn.com/profile/6599010/" data-layout="button_count"></div>
                    </div>
                    <div class="googleplusShare">
                        <div class="g-plusone" data-size="medium" data-href="https://www.sololearn.com/profile/6599010/"></div>
                    </div>
                    <div class="twitterShare">
                        <a class="twitter-share-button"
                           href="https://twitter.com/share"
                           data-url="https://www.sololearn.com/profile/6599010/"
                           data-via="SoloLearn">
                            Tweet
                        </a>
                    </div>
                </div>        
            </div>
        </div>
        <hr />
        <div class="userCoursesTitle">
            <h2>My Courses</h2>
                <button class="manageUserCourses"></button>
        </div>
            <div class="userCourses" > 
                    <div class="courseWrapper">
                        <div class="chart" data-percent="1.9607843137" data-size="60" data-line="3">
                            <canvas height="60" width="60"></canvas>
                        </div>
                        <a href="/Profile/6599010/JavaScript" class="course" title="JavaScript Tutorial">
                            <img src="/Icons/Courses/1024.png" alt="JavaScript Tutorial" />
                        </a>
                        <p class="courseXp">15 XP</p>
                    </div>
                    <div class="courseWrapper">
                        <div class="chart" data-percent="1.3888888888" data-size="60" data-line="3">
                            <canvas height="60" width="60"></canvas>
                        </div>
                        <a href="/Profile/6599010/CSharp" class="course" title="C# Tutorial">
                            <img src="/Icons/Courses/1080.png" alt="C# Tutorial" />
                        </a>
                        <p class="courseXp">10 XP</p>
                    </div>
            </div>
        
            <hr />
                <h2>My  Codes</h2>
                <div class="noCode">
                    <p class="title">No Codes Saved</p>
                    <p class="description">Start building your own code portfolio</p>
                    <a href="https://code.sololearn.com/#html" target="_blank" class="materialButton primary elevated">CODE NOW</a>
                </div>
        
        
            <hr />
            <h2>My Certificates</h2>
            <div id="certificates" class="certificates">
                    <div class="emptyBlock">
                            <span>You don't have any certificates. Complete courses to earn certificates.</span>
                    </div>
            </div>
        
        
        
            <hr />
            <h2>Achievements</h2>
            <div class="userAchievements full">
                    <div id="achievement56" class="achievement " title="Engaged in!">
                        <div class="icon" style="background-color: #8BC34A">
                            <img src="https://api.sololearn.com/Uploads/Achievements/56.png" alt="Engaged in!">
                        </div>
                        <div class="details">
                            <div class="title">
                                Engaged in!
                            </div>
                            <div class="description">
                                Complete a lesson
                            </div>
                        </div>
                    </div>
                    <div id="achievement103" class="achievement " title="Verified Account">
                        <div class="icon" style="background-color: #43A047">
                            <img src="https://api.sololearn.com/Uploads/Achievements/103.png" alt="Verified Account">
                        </div>
                        <div class="details">
                            <div class="title">
                                Verified Account
                            </div>
                            <div class="description">
                                Verify your account&#39;s email address
                            </div>
                        </div>
                    </div>
                    <div id="achievement104" class="achievement disabled" title="Moderator">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/104.png" alt="Moderator">
                        </div>
                        <div class="details">
                            <div class="title">
                                Moderator
                            </div>
                            <div class="description">
                                Awarded to members who have been selected by our moderation team to help moderate community content.
                            </div>
                        </div>
                    </div>
                    <div id="achievement105" class="achievement disabled" title="Gold Moderator">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/105.png" alt="Gold Moderator">
                        </div>
                        <div class="details">
                            <div class="title">
                                Gold Moderator
                            </div>
                            <div class="description">
                                Awarded to select Moderators who show expertise in moderation and are ready for the next level of responsibilities.
                            </div>
                        </div>
                    </div>
                    <div id="achievement107" class="achievement disabled" title="Quiz Reviewer">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/107.png" alt="Quiz Reviewer">
                        </div>
                        <div class="details">
                            <div class="title">
                                Quiz Reviewer
                            </div>
                            <div class="description">
                                Exclusive badge, handed out to community members who moderate user-generated quizzes.
                            </div>
                        </div>
                    </div>
                    <div id="achievement108" class="achievement disabled" title="Gold Quiz Reviewer">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/108.png" alt="Gold Quiz Reviewer">
                        </div>
                        <div class="details">
                            <div class="title">
                                Gold Quiz Reviewer
                            </div>
                            <div class="description">
                                Exclusive badge, handed out to experienced Quiz Reviewers who show expertise in moderation of user-generated quizzes.
                            </div>
                        </div>
                    </div>
                    <div id="achievement110" class="achievement disabled" title="Creator">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/110.png" alt="Creator">
                        </div>
                        <div class="details">
                            <div class="title">
                                Creator
                            </div>
                            <div class="description">
                                Create 10 SoloLearn-approved lessons in the Lesson Factory.
                            </div>
                        </div>
                    </div>
                    <div id="achievement111" class="achievement disabled" title="Creator Master">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/111.png" alt="Creator Master">
                        </div>
                        <div class="details">
                            <div class="title">
                                Creator Master
                            </div>
                            <div class="description">
                                Create 50 SoloLearn-approved lessons in the Lesson Factory.
                            </div>
                        </div>
                    </div>
                    <div id="achievement112" class="achievement disabled" title="Platinum Moderator">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/112.png" alt="Platinum Moderator">
                        </div>
                        <div class="details">
                            <div class="title">
                                Platinum Moderator
                            </div>
                            <div class="description">
                                Awarded to experienced moderators who are ready to recruit and train new moderators and curate community content.
                            </div>
                        </div>
                    </div>
                    <div id="achievement113" class="achievement disabled" title="Solution Master">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/113.png" alt="Solution Master">
                        </div>
                        <div class="details">
                            <div class="title">
                                Solution Master
                            </div>
                            <div class="description">
                                5 code coach solutions
                            </div>
                        </div>
                    </div>
                    <div id="achievement114" class="achievement disabled" title="Solution Ninja">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/114.png" alt="Solution Ninja">
                        </div>
                        <div class="details">
                            <div class="title">
                                Solution Ninja
                            </div>
                            <div class="description">
                                10 code coach solutions
                            </div>
                        </div>
                    </div>
                    <div id="achievement115" class="achievement disabled" title="Solution Guru">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/115.png" alt="Solution Guru">
                        </div>
                        <div class="details">
                            <div class="title">
                                Solution Guru
                            </div>
                            <div class="description">
                                50 code coach solutions
                            </div>
                        </div>
                    </div>
                    <div id="achievement116" class="achievement disabled" title="Solver">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/116.png" alt="Solver">
                        </div>
                        <div class="details">
                            <div class="title">
                                Solver
                            </div>
                            <div class="description">
                                Solve a code coach problem
                            </div>
                        </div>
                    </div>
                    <div id="achievement57" class="achievement disabled" title="Hat Trick">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/57.png" alt="Hat Trick">
                        </div>
                        <div class="details">
                            <div class="title">
                                Hat Trick
                            </div>
                            <div class="description">
                                Complete 3 courses
                            </div>
                        </div>
                    </div>
                    <div id="achievement58" class="achievement disabled" title="Course Master">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/58.png" alt="Course Master">
                        </div>
                        <div class="details">
                            <div class="title">
                                Course Master
                            </div>
                            <div class="description">
                                Complete 10 courses
                            </div>
                        </div>
                    </div>
                    <div id="achievement59" class="achievement disabled" title="Achiever">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/59.png" alt="Achiever">
                        </div>
                        <div class="details">
                            <div class="title">
                                Achiever
                            </div>
                            <div class="description">
                                Complete a course
                            </div>
                        </div>
                    </div>
                    <div id="achievement60" class="achievement disabled" title="Good Citizen">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/60.png" alt="Good Citizen">
                        </div>
                        <div class="details">
                            <div class="title">
                                Good Citizen
                            </div>
                            <div class="description">
                                Leave a comment in a lesson/quiz
                            </div>
                        </div>
                    </div>
                    <div id="achievement61" class="achievement disabled" title="Respected Citizen">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/61.png" alt="Respected Citizen">
                        </div>
                        <div class="details">
                            <div class="title">
                                Respected Citizen
                            </div>
                            <div class="description">
                                Reply to a comment in a lesson/quiz and get 5 upvotes
                            </div>
                        </div>
                    </div>
                    <div id="achievement62" class="achievement disabled" title="Just Getting Started">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/62.png" alt="Just Getting Started">
                        </div>
                        <div class="details">
                            <div class="title">
                                Just Getting Started
                            </div>
                            <div class="description">
                                Win a challenge
                            </div>
                        </div>
                    </div>
                    <div id="achievement63" class="achievement disabled" title="Master">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/63.png" alt="Master">
                        </div>
                        <div class="details">
                            <div class="title">
                                Master
                            </div>
                            <div class="description">
                                Win 50 challenges using one weapon
                            </div>
                        </div>
                    </div>
                    <div id="achievement64" class="achievement disabled" title="Unstoppable">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/64.png" alt="Unstoppable">
                        </div>
                        <div class="details">
                            <div class="title">
                                Unstoppable
                            </div>
                            <div class="description">
                                Win 100 challenges using one weapon
                            </div>
                        </div>
                    </div>
                    <div id="achievement65" class="achievement disabled" title="Practice Makes Perfect">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/65.png" alt="Practice Makes Perfect">
                        </div>
                        <div class="details">
                            <div class="title">
                                Practice Makes Perfect
                            </div>
                            <div class="description">
                                Win 200 challenges using one weapon
                            </div>
                        </div>
                    </div>
                    <div id="achievement66" class="achievement disabled" title="Guru">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/66.png" alt="Guru">
                        </div>
                        <div class="details">
                            <div class="title">
                                Guru
                            </div>
                            <div class="description">
                                Win 500 challenges using one weapon
                            </div>
                        </div>
                    </div>
                    <div id="achievement67" class="achievement disabled" title="On Your Way to Fame">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/67.png" alt="On Your Way to Fame">
                        </div>
                        <div class="details">
                            <div class="title">
                                On Your Way to Fame
                            </div>
                            <div class="description">
                                Flawless victory in a challenge
                            </div>
                        </div>
                    </div>
                    <div id="achievement68" class="achievement disabled" title="Challenge Master">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/68.png" alt="Challenge Master">
                        </div>
                        <div class="details">
                            <div class="title">
                                Challenge Master
                            </div>
                            <div class="description">
                                5 flawless victories in a row using one weapon
                            </div>
                        </div>
                    </div>
                    <div id="achievement69" class="achievement disabled" title="Rising Star">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/69.png" alt="Rising Star">
                        </div>
                        <div class="details">
                            <div class="title">
                                Rising Star
                            </div>
                            <div class="description">
                                Win 5 challenges in a row using one weapon
                            </div>
                        </div>
                    </div>
                    <div id="achievement70" class="achievement disabled" title="Unbeatable!">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/70.png" alt="Unbeatable!">
                        </div>
                        <div class="details">
                            <div class="title">
                                Unbeatable!
                            </div>
                            <div class="description">
                                Win 10 challenges in a row using one weapon
                            </div>
                        </div>
                    </div>
                    <div id="achievement71" class="achievement disabled" title="Epic!">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/71.png" alt="Epic!">
                        </div>
                        <div class="details">
                            <div class="title">
                                Epic!
                            </div>
                            <div class="description">
                                Win 50 challenges in a row using one weapon
                            </div>
                        </div>
                    </div>
                    <div id="achievement72" class="achievement disabled" title="Gaining Experience">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/72.png" alt="Gaining Experience">
                        </div>
                        <div class="details">
                            <div class="title">
                                Gaining Experience
                            </div>
                            <div class="description">
                                Complete 50 challenges using one weapon
                            </div>
                        </div>
                    </div>
                    <div id="achievement73" class="achievement disabled" title="The Player">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/73.png" alt="The Player">
                        </div>
                        <div class="details">
                            <div class="title">
                                The Player
                            </div>
                            <div class="description">
                                Complete 100 challenges using one weapon
                            </div>
                        </div>
                    </div>
                    <div id="achievement74" class="achievement disabled" title="Respect!">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/74.png" alt="Respect!">
                        </div>
                        <div class="details">
                            <div class="title">
                                Respect!
                            </div>
                            <div class="description">
                                Complete 500 challenges using one weapon
                            </div>
                        </div>
                    </div>
                    <div id="achievement75" class="achievement disabled" title="Asker">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/75.png" alt="Asker">
                        </div>
                        <div class="details">
                            <div class="title">
                                Asker
                            </div>
                            <div class="description">
                                Post a question and get an upvote
                            </div>
                        </div>
                    </div>
                    <div id="achievement76" class="achievement disabled" title="Good Question">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/76.png" alt="Good Question">
                        </div>
                        <div class="details">
                            <div class="title">
                                Good Question
                            </div>
                            <div class="description">
                                Get 5 upvotes on your question
                            </div>
                        </div>
                    </div>
                    <div id="achievement77" class="achievement disabled" title="Great Question">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/77.png" alt="Great Question">
                        </div>
                        <div class="details">
                            <div class="title">
                                Great Question
                            </div>
                            <div class="description">
                                Get 10 upvotes on your question
                            </div>
                        </div>
                    </div>
                    <div id="achievement78" class="achievement disabled" title="Top Question">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/78.png" alt="Top Question">
                        </div>
                        <div class="details">
                            <div class="title">
                                Top Question
                            </div>
                            <div class="description">
                                Get 50 upvotes on your question
                            </div>
                        </div>
                    </div>
                    <div id="achievement79" class="achievement disabled" title="Popular Question">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/79.png" alt="Popular Question">
                        </div>
                        <div class="details">
                            <div class="title">
                                Popular Question
                            </div>
                            <div class="description">
                                Get 100 upvotes on your question
                            </div>
                        </div>
                    </div>
                    <div id="achievement80" class="achievement disabled" title="Question Master">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/80.png" alt="Question Master">
                        </div>
                        <div class="details">
                            <div class="title">
                                Question Master
                            </div>
                            <div class="description">
                                Post 5 questions with at least 5 upvotes each
                            </div>
                        </div>
                    </div>
                    <div id="achievement81" class="achievement disabled" title="Question Ninja">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/81.png" alt="Question Ninja">
                        </div>
                        <div class="details">
                            <div class="title">
                                Question Ninja
                            </div>
                            <div class="description">
                                Post 10 questions with at least 5 upvotes each
                            </div>
                        </div>
                    </div>
                    <div id="achievement82" class="achievement disabled" title="Question Guru">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/82.png" alt="Question Guru">
                        </div>
                        <div class="details">
                            <div class="title">
                                Question Guru
                            </div>
                            <div class="description">
                                Post 50 questions with at least 5 upvotes each
                            </div>
                        </div>
                    </div>
                    <div id="achievement83" class="achievement disabled" title="Answerer">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/83.png" alt="Answerer">
                        </div>
                        <div class="details">
                            <div class="title">
                                Answerer
                            </div>
                            <div class="description">
                                Post an answer and get an upvote
                            </div>
                        </div>
                    </div>
                    <div id="achievement84" class="achievement disabled" title="Good Answer">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/84.png" alt="Good Answer">
                        </div>
                        <div class="details">
                            <div class="title">
                                Good Answer
                            </div>
                            <div class="description">
                                Get 5 upvotes on your answer
                            </div>
                        </div>
                    </div>
                    <div id="achievement85" class="achievement disabled" title="Great Answer">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/85.png" alt="Great Answer">
                        </div>
                        <div class="details">
                            <div class="title">
                                Great Answer
                            </div>
                            <div class="description">
                                Get 10 upvotes on your answer
                            </div>
                        </div>
                    </div>
                    <div id="achievement86" class="achievement disabled" title="Top Answer">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/86.png" alt="Top Answer">
                        </div>
                        <div class="details">
                            <div class="title">
                                Top Answer
                            </div>
                            <div class="description">
                                Get 50 upvotes on your answer
                            </div>
                        </div>
                    </div>
                    <div id="achievement87" class="achievement disabled" title="Popular Answer">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/87.png" alt="Popular Answer">
                        </div>
                        <div class="details">
                            <div class="title">
                                Popular Answer
                            </div>
                            <div class="description">
                                Get 100 upvotes on your answer
                            </div>
                        </div>
                    </div>
                    <div id="achievement88" class="achievement disabled" title="Teacher">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/88.png" alt="Teacher">
                        </div>
                        <div class="details">
                            <div class="title">
                                Teacher
                            </div>
                            <div class="description">
                                Post 10 answers with at least 5 upvotes each
                            </div>
                        </div>
                    </div>
                    <div id="achievement89" class="achievement disabled" title="Illuminator">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/89.png" alt="Illuminator">
                        </div>
                        <div class="details">
                            <div class="title">
                                Illuminator
                            </div>
                            <div class="description">
                                Post 50 answers with at least 5 upvotes each
                            </div>
                        </div>
                    </div>
                    <div id="achievement90" class="achievement disabled" title="Self-Learner">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/90.png" alt="Self-Learner">
                        </div>
                        <div class="details">
                            <div class="title">
                                Self-Learner
                            </div>
                            <div class="description">
                                Answer your own question and get 5 upvotes
                            </div>
                        </div>
                    </div>
                    <div id="achievement91" class="achievement disabled" title="Contributor">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/91.png" alt="Contributor">
                        </div>
                        <div class="details">
                            <div class="title">
                                Contributor
                            </div>
                            <div class="description">
                                Leave a comment in a lesson/quiz with 5 upvotes
                            </div>
                        </div>
                    </div>
                    <div id="achievement92" class="achievement disabled" title="Comment Master">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/92.png" alt="Comment Master">
                        </div>
                        <div class="details">
                            <div class="title">
                                Comment Master
                            </div>
                            <div class="description">
                                Leave 5 comments in a lesson/quiz with at least 5 upvotes each
                            </div>
                        </div>
                    </div>
                    <div id="achievement93" class="achievement disabled" title="Intern">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/93.png" alt="Intern">
                        </div>
                        <div class="details">
                            <div class="title">
                                Intern
                            </div>
                            <div class="description">
                                Post a code and get an upvote
                            </div>
                        </div>
                    </div>
                    <div id="achievement94" class="achievement disabled" title="Junior">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/94.png" alt="Junior">
                        </div>
                        <div class="details">
                            <div class="title">
                                Junior
                            </div>
                            <div class="description">
                                Get 5 upvotes on your code
                            </div>
                        </div>
                    </div>
                    <div id="achievement95" class="achievement disabled" title="Developer">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/95.png" alt="Developer">
                        </div>
                        <div class="details">
                            <div class="title">
                                Developer
                            </div>
                            <div class="description">
                                Get 10 upvotes on your code
                            </div>
                        </div>
                    </div>
                    <div id="achievement96" class="achievement disabled" title="Senior Developer">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/96.png" alt="Senior Developer">
                        </div>
                        <div class="details">
                            <div class="title">
                                Senior Developer
                            </div>
                            <div class="description">
                                Get 50 upvotes on your code
                            </div>
                        </div>
                    </div>
                    <div id="achievement97" class="achievement disabled" title="Coder">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/97.png" alt="Coder">
                        </div>
                        <div class="details">
                            <div class="title">
                                Coder
                            </div>
                            <div class="description">
                                Post 5 codes with at least 5 upvotes each
                            </div>
                        </div>
                    </div>
                    <div id="achievement98" class="achievement disabled" title="Code Master">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/98.png" alt="Code Master">
                        </div>
                        <div class="details">
                            <div class="title">
                                Code Master
                            </div>
                            <div class="description">
                                Post 10 codes with at least 5 upvotes each
                            </div>
                        </div>
                    </div>
                    <div id="achievement99" class="achievement disabled" title="Code Ninja">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/99.png" alt="Code Ninja">
                        </div>
                        <div class="details">
                            <div class="title">
                                Code Ninja
                            </div>
                            <div class="description">
                                Post 50 codes with at least 5 upvotes each
                            </div>
                        </div>
                    </div>
                    <div id="achievement101" class="achievement disabled" title="Quiz Creator">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/101.png" alt="Quiz Creator">
                        </div>
                        <div class="details">
                            <div class="title">
                                Quiz Creator
                            </div>
                            <div class="description">
                                Create 20 SoloLearn-approved quizzes in the Quiz Factory.
                            </div>
                        </div>
                    </div>
                    <div id="achievement102" class="achievement disabled" title="Quiz Creator Master">
                        <div class="icon" style="background-color:">
                            <img src="https://api.sololearn.com/Uploads/Achievements/102.png" alt="Quiz Creator Master">
                        </div>
                        <div class="details">
                            <div class="title">
                                Quiz Creator Master
                            </div>
                            <div class="description">
                                Create 100 SoloLearn-approved quizzes in the Quiz Factory.
                            </div>
                        </div>
                    </div>
            </div>
        
            <div id="certificateShare">
                <div class="dialog">
                    <div class="data">
                        <div class="textContainer">
                            <textarea placeholder="Say something about this..."></textarea>
                        </div>
                        <img class="cert" src="https://www.sololearn.com/Certificate/JavaScript/jpg/" alt="certificate" />
                        <div class="buttons">
                            <button class="materialButton elevated">Cancel</button>
                            <button class="materialButton primary elevated">Share</button>
                        </div>
                    </div>
                    <div class="loader">
                        <img src="/Content/shareLoad.gif" alt="Share Load"/>
                    </div>
                </div>
            </div>
            <div id="certificateShareResult">
                <div class="dialog">
                    <div class="message"></div>
                    <button class="materialButton primary elevated">Ok</button>
                </div>
            </div>
        </div>
        
        <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5720d15c98e6f544"></script>
        
        <script type="text/javascript">
            var addthis_config = addthis_config || {};
            addthis_config.data_track_addressbar = false;
            addthis_config.data_track_clickback = false;
        </script>
        
        
        
            </div>
        </div>
        
        
        
            <div id="footer" data-name="contacts">
            <div class="footerTitle">
                <p>Learn Playing. Play Learning</p>
            </div>
            <div class="footerContent wrapper">
                <div class="socialCounts">
                    <a class="footerSocial" href="https://twitter.com/SoloLearn/" target="_blank">
                        <div class="footerTwitter"></div>
                        <span>@SoloLearn</span>
                    </a>
                    <a class="footerSocial" href="http://www.facebook.com/SoloLearn/" target="_blank">
                        <div class="footerFacebook"></div>
                        <span>SoloLearn</span>
                    </a>
                    <a class="footerSocial" href="https://plus.google.com/+Sololearn/" target="_blank">
                        <div class="footerGooglePlus"></div>
                        <span>+Sololearn</span>
                    </a>
                </div>
                <div class="about">
                    <div class="logoFooter"></div>
                    <div>
                        <p>SoloLearn Inc.</p>
                        <address>
        <br />4 Embarcadero Center, Suite 1479
        <br />San Francisco, CA 94111</address>
                    </div>
                    <button>Email Us</button>
                </div>
                <div class="footerMenu User">
                    <ul>
                        <li>
                            <a href="/" id="footerHome">Home</a>
                        </li>
                        <li>
                            <a href="/Features/">Features</a>
                        </li>
                        <li>
                            <a href="/Courses/" id="footerCourses">Courses</a>
                        </li>
                        <li>
                            <a href="/Blog/" id="footerBlog">Blog</a>
                        </li>
                        <li>
                            <a href="/Contact/" id="footerContacts">Contact</a>
                        </li>
                        <li>
                            <a href="/Terms-of-Use/" id="footerPrivacy-Policy">Terms of Use</a>
                        </li>
                        <li>
                            <a href="/faq" id="faq">FAQ</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                © 2020 SoloLearn, Inc. All rights reserved.
            </div>
        </div>
        
        <div class="popupOverlay" id="mailingFormOutline">
            <div class="popupWrapper">
                <div class="popup block">
                    <script src='https://www.google.com/recaptcha/api.js'></script>
        
                    <p>Send us a message</p>
        <form action="/Home/SendinputMail" id="mailingForm" method="post">                <div class="popupField">
                            <input id="name" name="Name" placeholder="Enter your name" type="text" value="" />
                            <label for="name">Name: </label>
                        </div>
        <span class="field-validation-valid" data-valmsg-for="Email" data-valmsg-replace="true"></span>                <div class="popupField">
                            <input data-val="true" data-val-regex="Please enter a valid e-mail address" data-val-regex-pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" data-val-required="The Email field is required." id="e-mail" name="Email" placeholder="Enter your email" type="text" value="" />
                            <label for="e-mail">Email: </label>
                        </div>
        <span class="field-validation-valid" data-valmsg-for="Text" data-valmsg-replace="true"></span>                <div class="popupField">
                            <textarea cols="20" data-val="true" data-val-required="The Text field is required." id="text" name="Text" placeholder="Enter your message" rows="2">
        </textarea>
                            <label for="text">Message: </label>
                        </div>
                        <div class="g-recaptcha" data-sitekey="6LfzGgUTAAAAABluhj632xK5xt_vPsOA29ufcRa_"></div>
                        <div class="popupButtons">
                            <input type="submit" value="Send" data-action="submit" />
                            <input type="button" value="Cancel" data-action="cancel" />
                        </div>
        </form>        </div>
            </div>
        </div>
        
            <script src="/Scripts/Base?v=dFMWvFmHjmWZWlK3HbLdls3uBwmelBCT1zCGhyWHIXI1"></script>
        
            <script src="https://apis.google.com/js/platform.js" async defer></script>
            <script>
                (function (i, s, o, g, r, a, m) {
                    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                        (i[r].q = i[r].q || []).push(arguments)
                    }, i[r].l = 1 * new Date(); a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
                })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        
                ga('create', 'UA-42641357-2', 'auto');
                ga('require', 'displayfeatures');
                ga('send', 'pageview');
            </script>
            
            
            <script src="/Scripts/material.js"></script>
        
            <script src="/Scripts/moment?v=bmoFxRRdRbP5sP7BxiS3qr5rYmgVWxXpo7IAWPIIbpM1"></script>
        
        
        
        </body>
        </html>`;
        axios.get.mockImplementationOnce(() => Promise.resolve({ "data": data }));
        const dao = new SololearnDao();

        // act
        let xp = await dao.getXPForUser(validUserId);
        
        // assert
        expect(xp).toBeGreaterThanOrEqual(40);
        expect(axios.get).toHaveBeenCalledWith(
            `https://www.sololearn.com/Profile/${validUserId}`,
          );
    });

    test('it returns 0 xp when called with an invalid userid', async () => {

        // arrange
        const data = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8" />
            <title>Some Title</title>
        </head>
        <body>
        </body>
        </html>`;
        axios.get.mockImplementationOnce(() => Promise.resolve({ "data": data }));
        const errorMessage = 'Unable to fetch the xp from sololearn!';
        const dao = new SololearnDao();

        // act
        let xp = await dao.getXPForUser(invalidUserId);

        // assert
        expect(xp).toBe(0);
    });

    test('it throws an error when network errors occure', async () => {

        // arrange
        const errorMessage = 'Network Error';
        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        const dao = new SololearnDao();

        // act / assert
        await expect(dao.getXPForUser(validUserId)).rejects.toThrow(errorMessage);
    });

    
});



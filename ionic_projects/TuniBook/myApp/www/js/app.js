// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ionic-material','ngAnimate','firebase','ion-floating-menu'])

.run(["$ionicPlatform","$ionicPopup",function($ionicPlatform,$ionicPopup) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: "Pas de connexion internet",
          content: "L'Internet est déconnecté sur votre appareil."
        })
          .then(function(result) {
            if(!result) {
              ionic.Platform.exitApp();
            }
          });
      }
    }
  });
} ] )

 .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

 $stateProvider
 .state('root', {
 url : '/root',
 templateUrl : 'templates/Main.html',
 controller : 'MainController',

 })


 .state('books', {
 url : '/Books',
 templateUrl : 'templates/Books_abstrait.html',
 abstract : true,
 controller : 'BooksController'
 })


.state('books.home', {
  url: '/home',


  resolve: {
    GetBooks:['BookService', function (BookService) {
      //return BookService.getBooks().$loaded()
      return 0;

    }],


  },
  views: {
    'snd': {
      templateUrl: 'templates/Home.html',
      controller : 'HomeController'
    }
  }
})


  .state('books.profile', {
    url: '/profile',
    views: {
      'snd': {
        templateUrl: 'templates/profile.html',
        controller : 'ProfileController'
      }
    }
  })


  .state('books.followers', {
    url: '/followers',
    views: {
      'snd': {
        templateUrl: 'templates/Followers.html',
        controller : 'FollowersController'
      }
    }
  })


  .state('books.following', {
    url: '/following',
    views: {
      'snd': {
        templateUrl: 'templates/Following.html',
        controller : 'FollowingController'
      }
    }
  })



  .state('books.paramétres', {
    url: '/paramétres',
    views: {
      'snd': {
        templateUrl: 'templates/parametres.html',
        controller : 'ParametresController'
      }
    }
  })



  .state('books.notifications', {
    url: '/notifications',
    views: {
      'snd': {
        templateUrl: 'templates/Notifications.html',
        controller : 'NotificationsController'
      }
    }
  })


  .state('books.notifications-single', {
    url: '/notifications/:id',
    views: {
      'snd': {
        templateUrl: 'templates/Notifications_single.html',
        controller : 'Notification_SingleController'
      }
    }
  })



  .state('books.messages', {
    url: '/messages',
    views: {
      'snd': {
        templateUrl: 'templates/Messages.html',
        controller : 'MessagesController'
      }
    }
  })

  .state('books.message_single', {
    url: '/messages/:id/:uid',
    views: {
      'snd': {
        templateUrl: 'templates/Message_single.html',
        controller: 'Msg_SingleController'
      }
    }




  })


  .state('books.user', {
    url: '/user/:uid',
    views: {
      'snd': {
        templateUrl: 'templates/Profile_User.html',
        controller: 'UserController'
      },

    },
    resolve: {
      GetUser:['$stateParams','UserService',  function ($stateParams,UserService) {

         /*UserService.all.$loaded().then(function(users) {
           console.log('users are', JSON.stringify(users));
           console.log('user ', users.$getRecord($stateParams.uid));
           return users.$getRecord($stateParams.uid);
         })*/
        return $stateParams.uid;
      }]
    }
  })






$urlRouterProvider.otherwise('/root');
}])




.constant('FURL', {
    apiKey: "AIzaSyA2CAI8bvmpvccEQctwHI1xejRLAzhKb_A",
    authDomain: "tunibook-d3159.firebaseapp.com",
    databaseURL: "https://tunibook-d3159.firebaseio.com",
    storageBucket: "tunibook-d3159.appspot.com",
    messagingSenderId: "83554433834"
  }
)
  .constant('FirebaseUrl', 'https://tunibook-d3159.firebaseio.com/')
  .factory('Auth',['$firebaseAuth', function($firebaseAuth) {
    return $firebaseAuth();
  }])
  .factory('UserService',['$http','$firebaseObject','$firebaseArray','Auth', function($http,$firebaseObject,$firebaseArray,Auth){


    //*******Configute the listf os Users **********************//

    var ref = firebase.database().ref().child("Users");


    // create a synchronized array
    var users = $firebaseArray(ref);
    //var list = $firebase(ref.child('Users')).$asArray();


    var Users = {

      addUser : function(user)
      {


        return users.$add(user);

      },


      getCurrentUser : function(){

        return Auth.$getAuth() ;
      },

      all : function(){
        return users;
      },


      checkUser: function(id){





        return  users.$indexFor("Ahmed Rebai");

      },


      getFollowers : function(){


      },


      getFollowing :function(){


      },

      getNotifications :function(){


      },

      getMessages : function(){



      },


      sendMessage : function(idOther_User)
      {

      },

      modify_profile : function(){


      },

      follow_someone : function(){


      },


      like_Book : function(){


      },



      Add_Book_Favoris : function(){


      },

      getUserByuid : function(uid){
        /*var users = $firebaseArray(ref);

         console.log('result1', users.$indexFor("ahmed.bouhmid94@gmail.com"))
         console.log('user1 ',users.$getRecord("Ahmed Rebai"));*/

         users.$loaded().then(function(users) {
         console.log('users are', JSON.stringify(users));
         console.log('user ',users.$getRecord(uid));
         return users.$getRecord(uid);
         })

        return users.$getRecord(uid);

      }

    };





    return Users;

  }])


  //***********************************************************//

  //****  .factory('UserService',['$http','$firebaseObject','$firebaseArray', function($http,$firebaseObject,$firebaseArray){

  .factory('BookService',['$http','$firebaseObject','$firebaseArray', function($http,$firebaseObject,$firebaseArray){



    //réference vers Books
    var ref = firebase.database().ref().child("Books");

    // create a synchronized array
    var books =  new $firebaseArray(ref);






    var Books = {



      getBooks : function(){

        return books;
      },


      addBook : function(Book)
      {


        console.log('the Book is ', Book);

        //on doit vérifier si le livre existe déja !!!
        /*books.$add({
         id : '',
         ISBN :'0099910101',
         Title : 'A farewell to arms',
         uid_user :'KWTIdXQTTvNXHF4_wvd',
         Author : {
         Name : 'Ernest Hemingway',
         Hisotry :'',
         description :'',
         },
         "imageLinks":{
         "smallThumbnail":"https://covers.openlibrary.org/b/id/106175-S.jpg",
         "thumbnail":"https://covers.openlibrary.org/b/id/106175-S.jpg"},
         Likes :[{

         }],
         Favorites : [{

         }],
         language :'en',
         publisher :'Arrow Books',
         "infoLink":"",

         Comments :[{
         id : '',
         description : '',
         ByUser :'',
         created_at :''
         }]
         }).then(function(data){
         console.log('data', data);
         }).catch(function(err){
         console.log('err',err);
         })*/
      },

      searchBook_Title : function(Titre)
      {
        return $http.get('https://www.googleapis.com/books/v1/volumes?q='+ Titre);
      },


      searchBook_Author : function(author)
      {
        //search Book by Titre

      },

      searchBook_ISBN : function(ISBN)
      {
        //search Book by ISBN
        console.log('the IBN IS', ISBN);


        return $http.get('https://aqueous-gorge-91509.herokuapp.com/Books/'+ISBN);



      }

    }





    return Books


  }])

  .factory("chatMessages", ["$firebaseArray",
    function($firebaseArray) {
      // create a reference to the database location where we will store our data
      var ref = firebase.database().ref("Rooms");

      // this uses AngularFire to create the synchronized array
      return $firebaseArray(ref);
    }
  ])


  .controller('NavController',['$scope','$ionicSideMenuDelegate', function($scope, $ionicSideMenuDelegate) {


    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
    console.log("hello i'm here !!");
  }])




  //*****************************//
  .controller('BooksController',['$scope','$ionicModal','BookService','$ionicLoading','$timeout','$http','$firebaseArray',function($scope,
                                                                                                                                   $ionicModal,BookService,$ionicLoading,$timeout,$http,$firebaseArray) {

    $ionicModal.fromTemplateUrl('templates/addBook.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };





    $scope.openModal = function(){
      $scope.modal.show();


    }

    //*********************************//
    //function to add Book

    console.log('controller we are here jsjjsjs')


    $scope.search ={}

    $scope.submit = false ;


    //make a request



    $scope.addBook = function(isValid){




      console.log('isbn',$scope.search.isbn);


      $scope.submit = true

      if(isValid)
      {

        $ionicLoading.show({
          template: '<ion-spinner icon="dots"></ion-spinner>',
          hideOnStageChange: true,
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,
        });
        $timeout(function(){
          $ionicLoading.hide();
        },2000)

        BookService.searchBook_ISBN($scope.search.isbn)
          .then(function(data){
            $scope.closeModal();
            console.log('data', JSON.stringify(data));

          }).catch(function(err){
            console.log('err',err);
          })

        //***********Recherche par Titre********************//


        /* BookService.searchBook_Title($scope.search.title)
         .then(function(data){
         $scope.closeModal();
         console.log('data', JSON.stringify(data));

         }).catch(function(err){
         console.log('err',err);
         })*/


      }




    }


//variable pour afficher input ISBN



  }])



  //*****************************//
  .controller('MainController',['$scope','$firebaseObject','$firebaseAuth','Auth','$state','UserService','$http',function($scope,$firebaseObject,$firebaseAuth,
                                                                                                                          Auth,$state,UserService,$http) {



    console.log("hdhhdhdhdh");
    /*Auth.$createUserWithEmailAndPassword({
      "email": "foo@bar.com",   // The email corresponding to the authenticated user
      "email_verified": false,  // Whether or not the above email is verified
      "exp": 1465366314,        // JWT expiration time
      "iat": 1465279914,        // JWT issued-at time
      "sub": "g8u5h1i3t51b5",   // JWT subject (same as auth.uid)
      "auth_time": 1465279914,  // When the original authentication took place
      "firebase": {             // Firebase-namespaced claims
        "identities": {         // Authentication identities
          "github.com": [       // Provider
            "8513515"           // ID of the user on the above provider
          ]
        }
      }
    })
      .then(function(authData) {
        console.log('Logged in as:', authData.uid);

        $state.go('home.chkayet')
      })
      .catch(function(err) {
        console.log('error:',err);
        $scope.shwoError = true;
        //$state.go('login');
      });*/



    //********************************//

    //********************************//
    $scope.login = function(auth){


console.log("hey go go");
      $state.go('books.home');



      /*Auth.$signInWithPopup(auth)
        .then(function(authData) {


          if(auth=='facebook')
          {



            //test this slution
            $scope.User = {
              id : authData.user.uid,
              email : authData.user.email,
              username : authData.user.displayName,
              photoURL : authData.user.photoURL,
              refreshToken :null,
              accessToken:null,
              Followers :[{
                id : "",
                email : "",
                username : "",
                photoURL :""
              }],
              Following : [{
                id : "",
                email : "",
                username : "",
                photoURL :""
              }],
              Books : [{
                id : '',
                ISBN :'',
                Title : '',
              }],
              Books_Favorites :[{
                id : '',
                ISBN :'',
                Title : '',
              }],
              Books_Like :[{
                id : '',
                ISBN :'',
                Title : '',
              }],
              Messages :[{
                id : '',
                uid_user_sent :'',
                uid_user_received :'',
                text :'',
                created_at :'',
                seen :''
              }],
              Notifications :[{
                id : '',
                title :'',
                description :'',
                created_at : '',
                Seen :'',
              }]


            }







            UserService.addUser($scope.User )
              .then(function(data){
                console.log('data is', data);
                $state.go('books.home');
              }).catch(function(err){
                $state.go('books.home');
                console.log('err',err)
              })










          }else if(auth=='twitter')
          {





            console.log('twitter is ',JSON.stringify(authData));

            $scope.User = {
              id : authData.user.uid,
              email : authData.user.email,
              username : authData.user.displayName,
              photoURL : authData.user.photoURL,
              refreshToken :null,
              accessToken:null,
              Followers :[{
                id : "",
                email : "",
                username : "",
                photoURL :""
              }],
              Following : [{
                id : "",
                email : "",
                username : "",
                photoURL :""
              }],
              Books : [{
                id : '',
                ISBN :'',
                Title : '',
              }],
              Books_Favorites :[{
                id : '',
                ISBN :'',
                Title : '',
              }],
              Books_Like :[{
                id : '',
                ISBN :'',
                Title : '',
              }],
              Messages :[{
                id : '',
                uid_user_sent :'',
                uid_user_received :'',
                text :'',
                created_at :'',
                seen :''
              }],
              Notifications :[{
                id : '',
                title :'',
                description :'',
                created_at : '',
                Seen :'',

              }]


            }

            //***************/
            /*UserService.addUser($scope.User )
              .then(function(data){
                $state.go('books.home');
                console.log('data is', data);

              }).catch(function(err){
                $state.go('books.home');
                console.log('err',err)
              })


          }else{



            $scope.User = {
              id : authData.user.uid,
              email : authData.user.email,
              username : authData.user.displayName,
              photoURL : authData.user.photoURL,
              refreshToken :null,
              accessToken:null,
              Followers :[{
                id : "",
                email : "",
                username : "",
                photoURL :""
              }],
              Following : [{
                id : "",
                email : "",
                username : "",
                photoURL :""
              }],
              Books : [{
                id : '',
                ISBN :'',
                Title : '',
              }],
              Books_Favorites :[{
                id : '',
                ISBN :'',
                Title : '',
              }],
              Books_Like :[{
                id : '',
                ISBN :'',
                Title : '',
              }],
              Messages :[{
                id : '',
                uid_user_sent :'',
                uid_user_received :'',
                text :'',
                created_at :'',
                seen :''
              }],
              Notifications :[{
                id : '',
                title :'',
                description :'',
                created_at : '',
                Seen :'',

              }]


            }

            //***************/
            /*UserService.addUser($scope.User )
              .then(function(data){
                console.log('data is', data);
                $state.go('books.home');
              }).catch(function(err){
                console.log('err',err)
                $state.go('books.home');
              })

          }





          //$state.go('books');
        }).catch(function(err){
          console.log('err',err);


          $state.go('books.home');

        })*/
    }




  }])

  //*****************************//
  .controller('HomeController',['$scope','$ionicLoading','$timeout','$ionicModal','UserService',
    'BookService','$firebaseArray','GetBooks',function($scope,$ionicLoading, $timeout,$ionicModal,UserService,BookService,$firebaseArray,GetBooks, getCurrentUser) {




      $scope.$on("$ionicView.beforeEnter", function() {

        $ionicLoading.show({
          template: '<ion-spinner icon="dots"></ion-spinner>',
          hideOnStageChange: true,
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,
        });
        $timeout(function(){
          $ionicLoading.hide();
        },2000)
      });





      $scope.Books = GetBooks;


      /*
       { Author: Object, Comments: Array[1], ISBN: "0099910101", Title: "A farewell to arms", created_at: "Thu Nov 24 2016 21:21:18 GMT+0100 (…", id: "", imageLinks: Object, infoLink: "", language: "en", publisher: "Arrow Books", 3 more… }
       */

      //réference vers Books
      var ref = firebase.database().ref().child("Books");

      // create a synchronized array
      var books =  new $firebaseArray(ref);

      /*books.$add( {"Author":{"Hisotry":"","Name":"Ernest Hemingway","description":""},
       "Comments":[{"ByUser":"","created_at":"","description":"","id":""}],
       "ISBN":"0099910101","Title":"A farewell to arms",
       "created_at":"Thu Nov 24 2016 21:21:18 GMT+0100 (CET)",
       "id":"","imageLinks":{"smallThumbnail":"","thumbnail":""},"infoLink":"","language":
       "en","publisher":"Arrow Books",
       "by_user":{"uid":"xYkw9vHOnxfbmDQdYlqfhjxnn9g2",
       "displayName":"Rebai Ahmed",
       "photoURL":"http://pbs.twimg.com/profile_images/774683292348055552/UdGddPbW_normal.jpg",
       "email":null,
       "emailVerified":false,
       "isAnonymous":false,
       "providerData":[{"uid":"2787208365","displayName":"Rebai Ahmed","photoURL":"http://pbs.twimg.com/profile_images/774683292348055552/UdGddPbW_normal.jpg","email":null,"providerId":"twitter.com"}],"apiKey":"AIzaSyA2CAI8bvmpvccEQctwHI1xejRLAzhKb_A","appName":"[DEFAULT]","authDomain":"tunibook-d3159.firebaseapp.com","stsTokenManager":{"apiKey":"AIzaSyA2CAI8bvmpvccEQctwHI1xejRLAzhKb_A","refreshToken":"AGl2vTS7q8UKqWF2-49Tu2goV_GR_wjDb1APGBQsUndQ0tnIZvpOcdxmeaVoXJvD3TgbkEtubBeurnnaOnzQ1TKefKahUfvdBDjV-nR31nwb8MwR91Z0LylURrcPcjn6RX54PcLYrceLMFpGeniKqyxLY04mKuOWZp5PPdqXea0NRiayD8PeHResL_S6bqLS9tBqmifcop9ZA6egxQ9-LuzeXdHN7oUT0M_574hS_NqIZy2f5vA_ULIgT59Sileg-LoV3gjKtWgSBkJ7YDTf_JxnmSnXhFgXxV76EUBmTl29Y1YFRyroVl4","accessToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVhZTE3ZjZhZDlmOGJhYmRjZDIwYjFiYzQ1YzAzYTM4NjI4NDFlZGYifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdHVuaWJvb2stZDMxNTkiLCJuYW1lIjoiUmViYWkgQWhtZWQiLCJwaWN0dXJlIjoiaHR0cDovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNzc0NjgzMjkyMzQ4MDU1NTUyL1VkR2RkUGJXX25vcm1hbC5qcGciLCJhdWQiOiJ0dW5pYm9vay1kMzE1OSIsImF1dGhfdGltZSI6MTQ4MDI0OTQ5OSwidXNlcl9pZCI6InhZa3c5dkhPbnhmYm1EUWRZbHFmaGp4bm45ZzIiLCJzdWIiOiJ4WWt3OXZIT254ZmJtRFFkWWxxZmhqeG5uOWcyIiwiaWF0IjoxNDgwMjQ5NDk5LCJleHAiOjE0ODAyNTMwOTksImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsidHdpdHRlci5jb20iOlsiMjc4NzIwODM2NSJdfSwic2lnbl9pbl9wcm92aWRlciI6InR3aXR0ZXIuY29tIn19.E2vUCodsiNopafHfk6qFyXvDh10Dq2TZ1ReYLc_ogWUJ2wmNR9EEmjKhN8wgk5KLMWgtUCiWFpTSOcFoHZ7IsPcru53rptNtqM3gfo3fYVzC5Yie4eSsis0eHjMO0ZTae0a-3VqiCmOfalpSu-dUXO5x1mKRZ6ep6Z1QmmT2TCSYMF6UNh1LQO8acR7GnpURrQCejbNDHTWoh_nUQ51yQ0X1Lw9K3oexjQUf7fdwcal8-U54WTYOAEx40G2vBKQOEEEugq830zWFoPpt0-le_Tl57j9rEs5aSA9C4CM8MXR3T7wTfvQZwAxy_XtOHiV4gTaztOYAy-bia8lxmop7OQ",
       "expirationTime":1480253097521},"redirectEventId":null},
       "$id":"-KXMvOLgjZBKvfX7BVOk","$priority":null})*/

      /*
       {"Author":{"Hisotry":"","Name":"Ernest Hemingway","description":""},
       "Comments":[{"ByUser":"","created_at":"","description":"","id":""}],
       "ISBN":"0099910101","Title":"A farewell to arms",
       "created_at":"Thu Nov 24 2016 21:21:18 GMT+0100 (CET)",
       "id":"","imageLinks":{"smallThumbnail":"","thumbnail":""},"infoLink":"","language":
       "en","publisher":"Arrow Books",
       "by_user":{"uid":"xYkw9vHOnxfbmDQdYlqfhjxnn9g2","displayName":"Rebai Ahmed","photoURL":"http://pbs.twimg.com/profile_images/774683292348055552/UdGddPbW_normal.jpg",
       "email":null,"emailVerified":false,
       "isAnonymous":false,
       "providerData":[{"uid":"2787208365","displayName":"Rebai Ahmed",
       "photoURL":"http://pbs.twimg.com/profile_images/774683292348055552/UdGddPbW_normal.jpg",
       "email":null,"providerId":"twitter.com"}],"apiKey":"AIzaSyA2CAI8bvmpvccEQctwHI1xejRLAzhKb_A","appName":"[DEFAULT]","authDomain":"tunibook-d3159.firebaseapp.com","stsTokenManager":{"apiKey":"AIzaSyA2CAI8bvmpvccEQctwHI1xejRLAzhKb_A","refreshToken":"AGl2vTS7q8UKqWF2-49Tu2goV_GR_wjDb1APGBQsUndQ0tnIZvpOcdxmeaVoXJvD3TgbkEtubBeurnnaOnzQ1TKefKahUfvdBDjV-nR31nwb8MwR91Z0LylURrcPcjn6RX54PcLYrceLMFpGeniKqyxLY04mKuOWZp5PPdqXea0NRiayD8PeHResL_S6bqLS9tBqmifcop9ZA6egxQ9-LuzeXdHN7oUT0M_574hS_NqIZy2f5vA_ULIgT59Sileg-LoV3gjKtWgSBkJ7YDTf_JxnmSnXhFgXxV76EUBmTl29Y1YFRyroVl4","accessToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVhZTE3ZjZhZDlmOGJhYmRjZDIwYjFiYzQ1YzAzYTM4NjI4NDFlZGYifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdHVuaWJvb2stZDMxNTkiLCJuYW1lIjoiUmViYWkgQWhtZWQiLCJwaWN0dXJlIjoiaHR0cDovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNzc0NjgzMjkyMzQ4MDU1NTUyL1VkR2RkUGJXX25vcm1hbC5qcGciLCJhdWQiOiJ0dW5pYm9vay1kMzE1OSIsImF1dGhfdGltZSI6MTQ4MDI0OTQ5OSwidXNlcl9pZCI6InhZa3c5dkhPbnhmYm1EUWRZbHFmaGp4bm45ZzIiLCJzdWIiOiJ4WWt3OXZIT254ZmJtRFFkWWxxZmhqeG5uOWcyIiwiaWF0IjoxNDgwMjQ5NDk5LCJleHAiOjE0ODAyNTMwOTksImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsidHdpdHRlci5jb20iOlsiMjc4NzIwODM2NSJdfSwic2lnbl9pbl9wcm92aWRlciI6InR3aXR0ZXIuY29tIn19.E2vUCodsiNopafHfk6qFyXvDh10Dq2TZ1ReYLc_ogWUJ2wmNR9EEmjKhN8wgk5KLMWgtUCiWFpTSOcFoHZ7IsPcru53rptNtqM3gfo3fYVzC5Yie4eSsis0eHjMO0ZTae0a-3VqiCmOfalpSu-dUXO5x1mKRZ6ep6Z1QmmT2TCSYMF6UNh1LQO8acR7GnpURrQCejbNDHTWoh_nUQ51yQ0X1Lw9K3oexjQUf7fdwcal8-U54WTYOAEx40G2vBKQOEEEugq830zWFoPpt0-le_Tl57j9rEs5aSA9C4CM8MXR3T7wTfvQZwAxy_XtOHiV4gTaztOYAy-bia8lxmop7OQ",
       "expirationTime":1480253097521},"redirectEventId":null},
       "$id":"-KXMvOLgjZBKvfX7BVOk","$priority":null}
       */


      $scope.User =  JSON.stringify(UserService.getCurrentUser()) ;


      /*




       */










      $scope.addToFavorites = function(book){
        //User Service will add to favorite this Book
        console.log('the is was', book);
        $scope.User
      }


      $scope.StarBook = function(book){
        //UserService will start the Book
        console.log('the is was', book);
        $scope.User
      }

    }])

  //*****************************//

  .controller('ProfileController',['$scope','$ionicLoading','$timeout','UserService',function($scope,$ionicLoading,$timeout,UserService) {

    $scope.$on("$ionicView.beforeEnter", function() {
      console.log("Running stuff...");
      $ionicLoading.show({
        template: '<ion-spinner icon="dots"></ion-spinner>',
        hideOnStageChange: true,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
      });
      $timeout(function(){
        $ionicLoading.hide();
      },2000)
    });

    //**************************//
    console.log('ddd', JSON.stringify(UserService.getCurrentUser()));


    $scope.User =  JSON.stringify(UserService.getCurrentUser()) ;


  }])

  //*****************************//
  .controller('FollowersController',['$scope','$ionicLoading','$timeout','UserService' ,function($scope,$ionicLoading,$timeout,UserService) {

    $scope.$on("$ionicView.beforeEnter", function() {
      console.log("Running stuff...");
      $ionicLoading.show({
        template: '<ion-spinner icon="dots"></ion-spinner>',
        hideOnStageChange: true,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
      });
      $timeout(function(){
        $ionicLoading.hide();
      },2000)
    });
    //******************************//
    //**************************//
    console.log('ddd', JSON.stringify(UserService.getCurrentUser()));


    $scope.User =  JSON.stringify(UserService.getCurrentUser()) ;



  }])


  //*****************************//
  .controller('FollowingController',['$scope','$ionicLoading','$timeout','UserService' ,function($scope,$ionicLoading,
                                                                                                 $timeout,UserService) {

    $scope.$on("$ionicView.beforeEnter", function() {
      console.log("Running stuff...");
      $ionicLoading.show({
        template: '<ion-spinner icon="dots"></ion-spinner>',
        hideOnStageChange: true,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
      });
      $timeout(function(){
        $ionicLoading.hide();
      },2000)
    });

    //******************************//
    //**************************//
    console.log('ddd', JSON.stringify(UserService.getCurrentUser()));


    $scope.User =  JSON.stringify(UserService.getCurrentUser()) ;


  }])


  //*****************************//
  .controller('ParametresController',['$scope','$ionicLoading','$timeout','UserService',function($scope,$ionicLoading, $timeout,UserService) {

    $scope.$on("$ionicView.beforeEnter", function() {

      $ionicLoading.show({
        template: '<ion-spinner icon="dots"></ion-spinner>',
        hideOnStageChange: true,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
      });
      $timeout(function(){
        $ionicLoading.hide();
      },2000)
    });


    //******************************//
    //**************************//
    console.log('ddd', JSON.stringify(UserService.getCurrentUser()));


    $scope.User =  JSON.stringify(UserService.getCurrentUser()) ;


  }])


//*****************************//
  .controller('NotificationsController',['$scope','$ionicLoading','$timeout','UserService' ,function($scope,$ionicLoading,
                                                                                                     $timeout,UserService) {

    $scope.$on("$ionicView.beforeEnter", function() {
      console.log("Running stuff...");
      $ionicLoading.show({
        template: '<ion-spinner icon="dots"></ion-spinner>',
        hideOnStageChange: true,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
      });
      $timeout(function(){
        $ionicLoading.hide();
      },2000)
    });




    //******************************//
    //**************************//
    console.log('ddd', JSON.stringify(UserService.getCurrentUser()));


    $scope.User =  JSON.stringify(UserService.getCurrentUser()) ;



  }])

//*****************************//
  .controller('Notification_SingleController',['$scope','$ionicLoading','$timeout','UserService' ,function($scope,$ionicLoading,
                                                                                                           $timeout,UserService) {

    $scope.$on("$ionicView.beforeEnter", function() {

      $ionicLoading.show({
        template: '<ion-spinner icon="dots"></ion-spinner>',
        hideOnStageChange: true,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
      });
      $timeout(function(){
        $ionicLoading.hide();
      },2000)
    });





    $scope.User =  JSON.stringify(UserService.getCurrentUser()) ;



  }])
//********MessagesController

//*****************************//
  .controller('MessagesController',['$scope','$ionicLoading','$timeout','UserService','chatMessages',function($scope,
                                                                                                              $ionicLoading,$timeout,UserService,chatMessages) {

    $scope.$on("$ionicView.beforeEnter", function() {

      $ionicLoading.show({
        template: '<ion-spinner icon="dots"></ion-spinner>',
        hideOnStageChange: true,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
      });
      $timeout(function(){
        $ionicLoading.hide();
      },2000)
    });

    console.log('ddd', JSON.stringify(UserService.getCurrentUser()));


    $scope.User =  JSON.stringify(UserService.getCurrentUser()) ;



    $scope.messages = chatMessages;

    // a method to create new messages; called by ng-submit
    $scope.addMessage = function() {
      // calling $add on a synchronized array is like Array.push(),
      // except that it saves the changes to our database!
      $scope.messages.$add({
        from: $scope.User,
        content: $scope.message,
        to :''
      });

      // reset the message input
      $scope.message = "";
    }









  }])


  .controller('UserController',['$scope','$ionicLoading','$timeout','UserService','chatMessages','GetUser','$firebase','FirebaseUrl','$firebaseObject','$state',function($scope,
                                                                                                                                                                $ionicLoading,$timeout,UserService,chatMessages,GetUser,$firebase,FirebaseUrl,$firebaseObject,$state) {


    console.log('the controller User is ksksk')

    $scope.$on("$ionicView.beforeEnter", function() {

      $ionicLoading.show({
        template: '<ion-spinner icon="dots"></ion-spinner>',
        hideOnStageChange: true,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
      });
      $timeout(function(){
        $ionicLoading.hide();
      },3000)
    });

    console.log('the uid is ', GetUser)



    function loadUser()
    {
      UserService.all().$loaded().then(function(users) {
console.log('niggah')
        console.log('user ', users.$getRecord(GetUser));
        $scope.userProfile = users.$getRecord(GetUser);

      })
    }

    loadUser();





    $scope.currentUser =  JSON.stringify(UserService.getCurrentUser()) ;


    //console.log('our user profile is ', UserService.getUserByuid(GetUser));
    console.log('the currentUser is ', JSON.stringify( UserService.getCurrentUser()));

    /*
     our user profile is
     Object { Books: Array[1], Books_Favorites: Array[1], Books_Like: Array[1],
      Followers: Array[1], Following: Array[1],
       Messages: Array[1], Notifications: Array[1],
        email: "ahmed.bouhmid94@gmail.com", id: "vqU9oOmp1HSU61wJQDXtxAN5V7H2",
         photoURL: "https://scontent.xx.fbcdn.net/v/t1.…", }
     */



    $scope.messages = chatMessages;



    $scope.goChat = function(){
      $state.go('books.message_single',{"id": null, "uid": GetUser})
    }



    //function to followUser
    $scope.FollowUser = function(){
      //$scope.currentUser.add this User
    }



    // a method to create new messages; called by ng-submit
    $scope.addMessage = function() {
      // calling $add on a synchronized array is like Array.push(),
      // except that it saves the changes to our database!
      $scope.messages.$add({
        from:  $scope.currentUser,
        content: $scope.message,
        to :$scope.userProfile
      });

      // reset the message input
      $scope.message = "";
    }









  }])



  .controller('Msg_SingleController',['$scope','$ionicLoading','$timeout','UserService','chatMessages','$state','$stateParams',function($scope,$ionicLoading,$timeout,UserService,chatMessages,$state,$stateParams) {




    $scope.$on("$ionicView.beforeEnter", function() {

      $ionicLoading.show({
        template: '<ion-spinner icon="dots"></ion-spinner>',
        hideOnStageChange: true,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
      });
      $timeout(function(){
        $ionicLoading.hide();
      },2000)
    });

    $scope.currentUser =  JSON.stringify(UserService.getCurrentUser()) ;

    //$scope.otherUser

    console.log('MSG SINGLE CONTROLLER', JSON.stringify($stateParams))

    console.log('the chatMessages is', JSON.stringify(chatMessages));


    /*chatMessages.$add({
      _id: "",
      channel_id: "F2194E83-049A-4ADD-9F6A-79AB8FBA5F3C",
      owners: [$scope.currentUser],
      members:[$scope.currentUser,$scope.otherUser],
      title: "Room1",
      type: "room"
    })*/


    var idMessage = $stateParams.id





    //we must check idMessage
    /*
    if it was null then create a new room
    else get the olf room
     */


    /*
     {
     _id: "F2194E83-049A-4ADD-9F6A-79AB8FBA5F3C"
     channel_id: "F2194E83-049A-4ADD-9F6A-79AB8FBA5F3C"
     owners: ["jchris@gmail.com"],
     members:["jens@couchbase.com","traun@couchbase.com"],
     title: "Make it Happen!"
     type: "room"

     */



    if(id = "")
    {

      console.log('sent a new message ')


    }else{

      console.log('chat room !!!')

    }

    function loadUser()
    {
      UserService.all().$loaded().then(function(users) {
        console.log('niggah')
        var idUser = $stateParams.uid ;
        console.log('user ', users.$getRecord(idUser));
        $scope.userProfile = users.$getRecord(idUser);

      })
    }

    loadUser();





    $scope.currentUser =  JSON.stringify(UserService.getCurrentUser()) ;


    //console.log('our user profile is ', UserService.getUserByuid(GetUser));
    console.log('the currentUser is ', JSON.stringify( UserService.getCurrentUser()));


    // a method to create new messages; called by ng-submit
    $scope.addMessage = function() {
      // calling $add on a synchronized array is like Array.push(),
      // except that it saves the changes to our database!
      $scope.messages.$add({
        from:  $scope.currentUser,
        content: $scope.message,
        to :$scope.userProfile
      });

      // reset the message input
      $scope.message = "";
    }









  }])



  //UserController

  .run(['UserService','Auth','$rootScope',function(UserService,Auth,$rootScope) {

    //$rootScope.currentUser ;
    $rootScope.auth = Auth;
    $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {

      $rootScope.currentUser = JSON.stringify(UserService.getCurrentUser()) ;
    });
  }]);




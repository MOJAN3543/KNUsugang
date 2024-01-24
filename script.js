let isCAPCHAed = false;
			
			function CookieToPack(){
				let CookieString = document.cookie;
				let CookieList = CookieString.split(";");
				let CookieDict = {};
				
				CookieList.forEach((Cookie, index)=>{
					let CookieSplit = Cookie.trim().split("=");
					CookieDict[CookieSplit[0]] = CookieSplit[1];
				});
				
				let ret = [];
				
				for(let index=1;;index++){
					let Key = "Pack" + String(index);
					if(CookieDict[Key] == undefined)
						break;
					if(Object.values(CookieDict).filter(element => element === CookieDict[Key]).length != 1)
						continue;
					ret.push(CookieDict[Key]);
				}
				return ret;
			}
			
			
			function CookieToLecture(){
				let CookieString = document.cookie;
				let CookieList = CookieString.split(";");
				let CookieDict = {};
				
				CookieList.forEach((Cookie, index)=>{
					let CookieSplit = Cookie.trim().split("=");
					CookieDict[CookieSplit[0]] = CookieSplit[1];
				});
				
				let ret = [];
				
				for(let index=1;;index++){
					let Key = "Lec" + String(index);
					if(CookieDict[Key] == undefined)
						break;
					ret.push(CookieDict[Key]);
				}
				
				return ret;
			}

			function CookieToTime(){
				let CookieString = document.cookie;
				let CookieList = CookieString.split(";");
				let CookieDict = {};
				
				CookieList.forEach((Cookie, index)=>{
					let CookieSplit = Cookie.trim().split("=");
					CookieDict[CookieSplit[0]] = CookieSplit[1];
				});
				
				let ret = [];
				
				for(let index=1;;index++){
					let Key = "Time" + String(index);
					if(CookieDict[Key] == undefined)
						break;
					ret.push(CookieDict[Key]);
				}
				
				return ret;
			}
			
			function LectureCodeToLectureData(LectureCode){
				let Code = LectureCode.substr(0, 8);
				let Div = LectureCode.substr(8);
				
				let ret = [];
				
				fetch("https://mojan.pe.kr/LectureCodeAPI.php?Year=2024&Semester=0&Code="+Code)
					.then((response) => response.json())
					.then((LectureData) => {
					LectureData['data'].forEach((Lecture, index) => {
						if(Lecture['sbjetDvnno'] == Div){
							const KeyList = ['sbjetCd', 'sbjetNm', 'sbjetDvnno', 'sbjetSctnm', 'crdit', '', '','lssnsRealTimeInfo', 'attlcPrscpCnt', 'appcrCnt'];
							KeyList.forEach((Key, jndex) => {
								if(Lecture[Key] == undefined)
									ret.push("");
								else
									ret.push(Lecture[Key]);
							});
						}
					});
					
				});
				
				return ret;
			}
			
			function SearchListToHTML(SearchList){
				let SearchTable = document.querySelector(".search_info > table > tbody");
				let SearchListHTML = document.querySelectorAll(".search_info > table > tbody > tr:not(:first-child)");
				let NoResultDiv = document.querySelector(".search_info > .no_result");
				
				if(SearchListHTML.length != 0){
					SearchListHTML.forEach((HTML, index) => {HTML.remove()});
				}
				
				
				if(NoResultDiv != null){
					NoResultDiv.remove();
				}
				
				
				if(SearchList[0].length == 0){
					alert("검색된 과목이 없습니다.");
					let SearchDiv = document.querySelector(".search_info");
					let NoResultDiv = document.createElement("div");
					NoResultDiv.className = "no_result";
					NoResultDiv.innerHTML = "조회된 목록이 없습니다.";
					SearchDiv.appendChild(NoResultDiv);
					return;
				}
				else{
					let CountH5 = document.querySelector(".search_info > div > h5");
					CountH5.innerHTML = `${SearchList.length}건`;
				}
				
				SearchList.forEach((Search, index) => {
					let trModel = document.createElement("tr");
					
					let indexModel = document.createElement("th");
					indexModel.innerHTML = index+1;
					trModel.appendChild(indexModel);
					
					let buttonthModel = document.createElement("th");
					let buttonModel = document.createElement("button");
					buttonModel.innerHTML = "신청";
					buttonModel.className = "signup";
					let Code = Search[0]+Search[2];
					buttonModel.onclick = () => SignUpButton(Code);
					buttonthModel.appendChild(buttonModel);
					trModel.appendChild(buttonthModel);
					
					Search.forEach((Info, jndex) => {
						let thModel = document.createElement("th");
						thModel.innerHTML = Info;
						trModel.appendChild(thModel);
					});
					
					SearchTable.appendChild(trModel);
				});
				
				
			}
			
			function PackListToHTML(PackList){
				let PackTable = document.querySelector(".pack_info > table > tbody");
				
				
				PackList.forEach((Pack, index) =>{
					let trModel = document.createElement("tr");
					
					let indexModel = document.createElement("th");
					indexModel.innerHTML = index+1;
					trModel.appendChild(indexModel);
					
					let buttonthModel = document.createElement("th");
					let buttonModel = document.createElement("button");
					buttonModel.innerHTML = "신청";
					buttonModel.className = "signup";
					let Code = Pack[0]+Pack[2];
					buttonModel.onclick = () => SignUpButton(Code);
					buttonthModel.appendChild(buttonModel);
					trModel.appendChild(buttonthModel);
					
					Pack.forEach((Info, jndex) => {
						let thModel = document.createElement("th");
						thModel.innerHTML = Info;
						trModel.appendChild(thModel);
					});
					
					let thModel = document.createElement("th");
					thModel.innerHTML = "0";
					trModel.appendChild(thModel);
					
					PackTable.appendChild(trModel);
				});
				
				if(PackList.length == 0){
					let PackDiv = document.querySelector(".pack_info");
					let NoResultDiv = document.createElement("div");
					NoResultDiv.className = "no_result";
					NoResultDiv.innerHTML = "조회된 목록이 없습니다.";
					PackDiv.appendChild(NoResultDiv);
				}
				else{
					let CountH5 = document.querySelector(".pack_info > div > h5");
					CountH5.innerHTML = `${PackList.length}건`;
				}
			}
			
			function LectureListToHTML(LectureList){
				let LectureTable = document.querySelector(".signed_info > table > tbody");
				
				
				LectureList.forEach((Lecture, index) =>{
					let trModel = document.createElement("tr");
					
					let indexModel = document.createElement("th");
					indexModel.innerHTML = index+1;
					trModel.appendChild(indexModel);
					
					let buttonthModel = document.createElement("th");
					let buttonModel = document.createElement("button");
					buttonModel.innerHTML = "삭제";
					buttonModel.className = "signup";
					buttonModel.onclick = () => DeleteButton(index+1);
					buttonthModel.appendChild(buttonModel);
					trModel.appendChild(buttonthModel);
					
					
					for(let j=0; j<8; j++){
						let thModel = document.createElement("th");
						thModel.innerHTML = Lecture[j];
						trModel.appendChild(thModel);
					}
					
					LectureTable.appendChild(trModel);
				});
				
				if(LectureList.length == 0){
					let PackDiv = document.querySelector(".signed_info");
					let NoResultDiv = document.createElement("div");
					NoResultDiv.className = "no_result";
					NoResultDiv.innerHTML = "조회된 목록이 없습니다.";
					PackDiv.appendChild(NoResultDiv);
				}
				else{
					let CountH5 = document.querySelector(".signed_info > div > h5");
					CountH5.innerHTML = `${LectureList.length}건`;
				}
			}
			
			function SignUpButton(Code){
				let Time = new Date();
				let isConfirm = confirm("신청 하시겠습니까?");
				if(isConfirm){
					if(isSignTime(Time) == false){
						alert("수강 신청 기간이 아닙니다.");
					return;
					}
					LectureSign(Code);
					alert("신청되었습니다.");
					window.location.reload();
				}
			}
			
			function CheckCAPCHA(){
				let input = document.querySelector(".CAPCHAinput").value;
				let CAPCHA = document.querySelector(".CAPCHA").innerHTML;
				if(CAPCHA.toLowerCase() == input.toLowerCase()){
					let ConfirmH4 = document.querySelector(".lecture_info > h4");
					ConfirmH4.innerHTML = "확인되었습니다.";
					isCAPCHAed = true;
				}
				else{
					alert("자동입력방지문자와 다릅니다.");
				}
			}
			
			function SearchButton(){
				let SearchInput = document.querySelector(".CodeInput");
				if(!isCAPCHAed)
					alert("자동입력방지문자를 입력해주세요.");
				else{
					let ConfirmH4 = document.querySelector(".lecture_info > h4");
					ConfirmH4.innerHTML = "";
					isCAPCHAed = false;
					CAPCHAreroll();
					let LectureData = LectureCodeToLectureData(SearchInput.value);
					let LectureDataList = [LectureData];
					setTimeout(function(){SearchListToHTML(LectureDataList)}, 800);
				}
			}

			function CAPCHAreroll(){
				const AlphabetPool = "ABCDEFGHJKLMNPQRSTUVWXYZ";
				const NumberPool = "23456789";
				
				let CAPCHAelement = document.querySelector(".CAPCHA");
				let CAPCHA = "";
				
				for(let index=0; index<4; index++){
					let tmp = Math.random();
					if(tmp<0.66){
						tmp = Math.random();
						CAPCHA += AlphabetPool[Math.floor(tmp*24)];
					}
					else{
						tmp = Math.random();
						CAPCHA += NumberPool[Math.floor(tmp*8)];
					}
				}
				
				CAPCHAelement.innerHTML = CAPCHA;
			}
			
			function PackSettingModalToggle(){
				let Modal = document.querySelector(".background");
				if(Modal.style.display != 'none')
					Modal.style.display = 'none';
				else
					Modal.style.display = '';
			}
			
			function PackSettingListPushTableRow(Code, Name){
				let PackSettingTable = document.querySelector(".content > table > tbody");
				
				let PackSettingTRList = document.querySelectorAll(".content > table > tbody > tr");
				
				let trModel = document.createElement("tr");
				
				let NumberModel = document.createElement("th");
				NumberModel.innerHTML = PackSettingTRList.length;
				trModel.appendChild(NumberModel);
				
				let InputTHmodel = document.createElement("th");
				let inputModel = document.createElement("input");
				if(Code != null)
					inputModel.value = Code;
				inputModel.placeholder = "과목코드입력 (11자리)";
				InputTHmodel.appendChild(inputModel);
				trModel.appendChild(InputTHmodel);
				
				let Namemodel = document.createElement("th");
				if(Name == null)
					Namemodel.innerHTML = Math.random()<0.9?"코드 입력 대기중 🤔":"코드 입력 기대중 😊";
				else
					Namemodel.innerHTML = Name + " ✔️";
				trModel.appendChild(Namemodel);
				
				let DeleteModel = document.createElement("th");
				let ButtonModel = document.createElement("button");
				ButtonModel.innerHTML = "삭제";
				ButtonModel.onclick = () => {PackRemove(PackSettingTRList.length)};
				DeleteModel.appendChild(ButtonModel);
				trModel.appendChild(DeleteModel);
				
				PackSettingTable.appendChild(trModel);
				
			}
			
			function PackSettingAddToggle(){
				let PackSettingTable = document.querySelector(".content > table > tbody");
				let AddButton = document.querySelector(".content > table > tbody > #Add");
				if(AddButton == null){
					let PackSettingTRList = document.querySelectorAll(".content > table > tbody > tr");
					
					let trModel = document.createElement("tr");
					trModel.id = "Add";
					
					let NumberModel = document.createElement("th");
					NumberModel.innerHTML = PackSettingTRList.length;
					trModel.appendChild(NumberModel);
					
					let ButtonModel = document.createElement("th");
					ButtonModel.setAttribute('colspan', '3');
					let AddButtonModel = document.createElement("button");
					AddButtonModel.innerHTML = "추가";
					AddButtonModel.onclick = PackAddInput;
					ButtonModel.appendChild(AddButtonModel);
					trModel.appendChild(ButtonModel);
					
					PackSettingTable.appendChild(trModel);
				}
				else
					AddButton.remove();
			}
			
			function PackSettingListInit(){
				
				PackSettingAddToggle();
				
				let input = CookieToPack();
				
				let PackSettingTable = document.querySelector(".content > table > tbody");
				
				let PackDataList = []
				
				input.forEach((Pack, index) => {PackDataList.push(LectureCodeToLectureData(Pack));});
				
				setTimeout(function(){
					PackDataList.forEach((Data, index) => {
						PackSettingListPushTableRow(Data[0]+Data[2], Data[1]);
					});
				}, 800);
				
				setTimeout(function(){PackSettingAddToggle()},900);
			}
			
			function PackAddInput(){
				PackSettingAddToggle();
				
				PackSettingListPushTableRow(null, null);
				
				PackSettingAddToggle();
			}
			
			function PackRemove(index){
				PackSettingAddToggle();
				
				let PackSettingTRList = document.querySelectorAll(".content > table > tbody > tr");
				if(PackSettingTRList[index].querySelector("th:nth-child(3)").innerHTML.indexOf("✔️") != -1){
					// CookieRemove(PackSettingTRList[index].querySelector("th:nth-child(2)").value);
					CookieRemoveByIndex(index);
				}
				for(let i=index+1; i<PackSettingTRList.length; i++){
					PackSettingTRList[i].querySelector("th:nth-child(1)").innerHTML -= 1;
					PackSettingTRList[i].querySelector("th:nth-child(4) > button").onclick = () => {PackRemove(Number(PackSettingTRList[i].querySelector("th:nth-child(1)").innerHTML))};
				}
				PackSettingTRList[index].remove();
				
				PackSettingAddToggle();
			}
			
			function CookieRemoveByIndex(index){
				let CookieString = document.cookie;
				let CookieList = CookieString.split(";");
				let CookieDict = {};
				
				CookieList.forEach((Cookie, index)=>{
					let CookieSplit = Cookie.trim().split("=");
					CookieDict[CookieSplit[0]] = CookieSplit[1];
				});
				
				document.cookie = "Key"+String(index)+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/KNUsugang;";
				
				for(let i=index+1;;i++){
					let Key = "Pack" + String(i);
					let MovedKey = "Pack" + String(i-1);
					if(CookieDict[Key] == undefined)
						break;
					document.cookie = Key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/KNUsugang;";
					document.cookie = MovedKey + "=" + "" + CookieDict[Key];
				}
				
			}
			
			function CookieSet(List){
				let CookieString = document.cookie;
				let CookieList = CookieString.split(";");
				let CookieDict = {};
				
				CookieList.forEach((Cookie, index)=>{
					let CookieSplit = Cookie.trim().split("=");
					CookieDict[CookieSplit[0]] = CookieSplit[1];
				});
				
				for(let index=1;;index++){
					let Key = "Pack" + String(index);
					if(CookieDict[Key] == undefined)
						break;
					document.cookie = Key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/KNUsugang;";
				}
				
				List.forEach((Code, index) => {
					let Key = "Pack" + String(index+1);
					document.cookie = Key + " = " + Code;
				});
				
			}
			
			function PackEval(){
				let PackSettingNameList = document.querySelectorAll(".content > table > tbody > tr:not(:first-child) > th:nth-child(3)");
				let PackSettingInputList = document.querySelectorAll(".content > table > tbody > tr > th > input");
				
				let PackDataList = []
				
				let MakeCookieList = [];
				
				PackSettingInputList.forEach((Input, index) => {PackDataList.push(LectureCodeToLectureData(Input.value));});
				PackSettingNameList.forEach((Name, index) => {if(PackSettingInputList[index].value!="") Name.innerHTML = "검색중 🔍"});
				
				setTimeout(function(){
					PackSettingNameList.forEach((Name, index) => {
						if(PackSettingInputList[index].value != ""){
							if(PackDataList[index].length != 0){
								Name.innerHTML = PackDataList[index][1] + " ✔️";
								MakeCookieList.push(PackSettingInputList[index].value);
							}
							else
								Name.innerHTML = "올바르지 않은 과목코드 🚫";
						}
					});
					CookieSet(MakeCookieList);
				}, 800);
				
			}
			
			function isSignTime(Time){
				if(Time.getMinutes()%5 <= 1 || (Time.getMinutes()%5 == 2 && Time.getSeconds() <= 29))
					return true;
				return false;
			}
			
			function LectureSign(Code){
				let Time = new Date();

				let DeleteTime = new Date()
				DeleteTime.setMinutes(Time.getMinutes()-(Time.getMinutes()%5)+4, 0, 0);
				
				let CookieString = document.cookie;
				let CookieList = CookieString.split(";");
				let CookieDict = {};
				
				CookieList.forEach((Cookie, index)=>{
					let CookieSplit = Cookie.trim().split("=");
					CookieDict[CookieSplit[0]] = CookieSplit[1];
				});
				
				let NextIndex = 1;
				while(true){
					if(CookieDict["Lec"+String(NextIndex)] == undefined)
						break;
					NextIndex++;
				}

				let elapsedTime = `${(Time.getMinutes()%5)*60+Time.getSeconds()}.${Time.getMilliseconds()}s`;
				
				document.cookie = `Lec${NextIndex} = ${Code}; expires=${DeleteTime.toGMTString()}; path=/KNUsugang;`;
				document.cookie = `Time${NextIndex} = ${elapsedTime}; expires=${DeleteTime.toGMTString()}; path=/KNUsugang;`;
				
			}
			
			function DeleteButton(index){
				let isConfirm = confirm("삭제 하시겠습니까?");
				if(isConfirm){
					LectureDelete(index);
					alert("삭제되었습니다.");
					window.location.reload();
				}
			}
			
			function LectureDelete(index){
				let CookieString = document.cookie;
				let CookieList = CookieString.split(";");
				let CookieDict = {};
				
				CookieList.forEach((Cookie, index)=>{
					let CookieSplit = Cookie.trim().split("=");
					CookieDict[CookieSplit[0]] = CookieSplit[1];
				});
				
				let NextIndex = index+1;
				while(true){
					if(CookieDict["Lec"+String(NextIndex)] == undefined)
						break;
					document.cookie = `Lec${NextIndex-1} = ${CookieDict["Lec"+String(NextIndex)]}`;
					document.cookie = `Time${NextIndex-1} = ${CookieDict["Time"+String(NextIndex)]}`;
					NextIndex++;
				}
				console.log(NextIndex);
				document.cookie = `Lec${NextIndex-1} =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/KNUsugang;`;
				document.cookie = `Time${NextIndex-1} =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/KNUsugang;`;
			}
			
			function TimerOpen(){
				let win = window.open("https://mojan3543.github.io/KNUsugang/Timer");
			}

			function TimerInit(LectureDataList){
				let Time = new Date();

				let timerContainer = document.querySelector(".timer_container");
				if(isSignTime(Time) == false)
					return;

				let titleModel = document.createElement("h1");
				
				let PackList = CookieToPack();
				let LectList = CookieToLecture();
				let TimeList = CookieToTime();
				
				let lectSize = LectList.length;
				let totalSize = PackList.length + lectSize;
				
				if(lectSize >= totalSize)
					titleModel.innerHTML = "🏆 올 클리어 🏆";
				else
					titleModel.innerHTML = `🏃‍♂️ 수강신청 중 ... (${lectSize}/${totalSize})`;
				
				timerContainer.appendChild(titleModel);

				for(let index = 0; index < lectSize; index++){
					let timerModel = document.createElement("h3");
    				timerModel.innerHTML = `#${index+1} ${LectureDataList[index][1]}: ${TimeList[index]}`;
    				timerContainer.appendChild(timerModel);
				}

			}

			window.onload = function(){

				
				let CookiePackList = CookieToPack();
				let PackDataList = [];
				CookiePackList.forEach((Pack, index) => {
					PackDataList.push(LectureCodeToLectureData(Pack));
				});
				
				setTimeout(function(){PackListToHTML(PackDataList)}, 1500);
				
				
				let CookieLectureList = CookieToLecture();
				let LectureDataList = [];
				CookieLectureList.forEach((Lecture, index) => {
					LectureDataList.push(LectureCodeToLectureData(Lecture));
				});
				
				setTimeout(function(){LectureListToHTML(LectureDataList)}, 1500);
				
				PackSettingListInit();

				setTimeout(function(){TimerInit(LectureDataList)}, 1500);
				
				CAPCHAreroll();
			}

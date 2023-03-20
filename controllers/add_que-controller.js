const querySolver = require('../database/querysolver.js');
class Que {
    // INSERT INTO question_master (question_id, category_id, question, question_answer) VALUES ('1', '1', 'hello', 'sdfsdf');
    static addQuePage = async (req, res) => {
        let queCategories = await querySolver(`SELECT category_id,category_name FROM exam_admin.question_category`);
        // SELECT category_id,category_name FROM exam_admin.question_category;
        res.render('add_que-v1', { queCategories });
    }
    static addQue = async (req, res) => {
        let total_option = 0;
        let { question, coding_question, optionid, option, categories_id, coding_question_chkbox } = req.body;

        // let queCategories = await querySolver(`INSERT INTO question_master (question_id, category_id, question, question_answer) VALUES ('${queid}', '${categories_id}', '${question}', '${option[optionid]}');`);
        // for (let index = 0; index < option.length; index++) {
        //     for (let index = 0; index < option.length; index++) {
        //         if (option[index] != undefined && option[index] != null && option[index].trim() != '') {
        //             await querySolver(`INSERT INTO option_master (question_id, option_value) VALUES ('${queid}', '${option[index]}');`);
        //         }
        //     }
        // }
        for (let option_chk = 0; option_chk < option.length; option_chk++) {
            if (option[option_chk] != undefined && option[option_chk].trim() != '') {
                total_option++;
            }
        }
        if (question.trim() != '' && question != undefined) {
            if (total_option >= 4) {
                if (optionid != undefined) {
                    let que_adder,que_id;
                    if (coding_question_chkbox != undefined && coding_question != undefined && coding_question.trim() != '') {
                        que_adder = await querySolver(`INSERT INTO question_master (category_id, question, question_answer,isCoding) VALUES ('${categories_id}', '${question}', '${option[optionid]}', '1');`);
                        que_id = await que_adder.insertId;
                        console.log(que_adder);
                        await querySolver(`INSERT INTO question_coding (question_id, coding_question) VALUES ('${que_id}', '${coding_question}');`);
                        res.end("question: " + question + " coding_question: " + coding_question + " optionid: " + optionid + " option: " + option + " categories_id: " + categories_id + "------------------ chk box ticked");
                    }
                    else {
                        que_adder = await querySolver(`INSERT INTO question_master (category_id, question, question_answer,isCoding) VALUES ('${categories_id}', '${question}', '${option[optionid]}', '0');`);
                        que_id = que_adder.insertId;
                        console.log("adding");
                        res.end("question: " + question + " coding_question: " + coding_question + " optionid: " + optionid + " option: " + option + " categories_id: " + categories_id + "------------------ chk box not ticked");
                    }

                    for (let index = 0; index < option.length; index++) {
                        if (option[index] != undefined && option[index] != null && option[index].trim() != '') {
                            await querySolver(`INSERT INTO option_master (question_id, option_value) VALUES ('${que_id}', '${option[index]}');`);
                        }
                    }
                }
                else {
                    res.end("select right answer");
                }
            }
            else {
                res.end("less than 4 options selected");
            }
        }
        else {
            res.end("else part");
        }
    }
}
module.exports = Que;
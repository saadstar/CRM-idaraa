import Customar from "../models/customar.js";
  
export const createCustomar = async (req, res) => {
  try {        
      const {
        company,
        region,
        entitySize,
        sector,
        person,
        email,
        phone,
        notes     
      } = req.body;
    

    const customar = await Customar.create({
        company,
        region,
        entitySize,
        sector,
        person,
        email,
        phone,
        notes  
    });   
    await customar.save();

    res
      .status(200)
      .json({ status: true, customar, message: "تم إضافه العميل بنجاح." });
  } catch (error) {    
    return res.status(400).json({ status: false, message: error.message });
  }
}; 
export const updateCustomar = async (req, res) => {
    try {
      const { id } = req.params;
      const {
          company,
          region,
          entitySize,
          sector,
          person,
          email,
          phone,
          notes 
      } = req.body;
  
      const customar = await Customar.findById(id);
  
      customar.company=company;
      customar.region=region;
      customar.entitySize=entitySize;
      customar.sector=sector;
      customar.person=person;
      customar.email=email;
      customar.phone=phone;
      customar.notes=notes;
  
      await customar.save();
  
      res.status(200).json({ status: true, message: "تم التعديل بنجاح" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
  }; 
    // get Customars by person query
export const getCustomars = async (req, res) => {
  try {
    const { person, isTrashed } = req.query;    
    let query = {};
    if (person) query.person = person;
    if (isTrashed !== undefined) query.isTrashed = isTrashed;

    const customars = await Customar.find(query).sort({ _id: -1 });

    res.status(200).json({ status: true, customars });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};   
export const trashCustomar = async (req, res) => {
  try {
    const { id } = req.params;

    const customar = await Customar.findById(id);

    customar.isTrashed = true;

    await customar.save();

    res.status(200).json({
      status: true,
      message: `تم الحذف`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
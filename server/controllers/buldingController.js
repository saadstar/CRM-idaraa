import Bulding from "../models/building.js";
  
export const createBulding = async (req, res) => {
  try {    
    const {userId}=req.user
      const {
        documnetNum,
        identityId,
        type,
        size,
        usageType,
        site,
        pieceNumber,
        district,
        city,
        nationalId,
        name,
        owingPercentage,
        phone,
        reasone,
      } = req.body;

    const activity = {
      type: "البدأ",
      activity: "تم إدخال بيانات العقار و مالكه",
      by: userId,
    };

    const reqClient = {
      nationalId,
      name,
        owingPercentage,
      phone
    };
    

    const bulding = await Bulding.create({
      documnetNum,
      identityId,
      type,
      size,
      usageType,
      site,
      pieceNumber,
      district,
      city,   
      owingPercentage,
        activities: activity,
      client:reqClient
    });
       if (req.files) {
      req.files.forEach(file => {
        bulding.assets.push(file.path);
      });
    }    

    await bulding.save();

    res
      .status(200)
      .json({ status: true, bulding, message: "تم إضافه العقار بنجاح." });
  } catch (error) {    
    return res.status(400).json({ status: false, message: error.message });
  }
};
export const getClients = async (req, res) => {
  try {
    const clients = await Bulding.find({}, "client").sort({ _id: -1 });     
    const allClients = clients.flatMap(building => building.client);
    res.status(200).json({ status: true, clients: allClients });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getBuldings = async (req, res) => {
  try {
    const { documnetNum, isTrashed } = req.query;    
    let query = {};
    if (documnetNum) query.documnetNum = documnetNum;
    if (isTrashed !== undefined) query.isTrashed = isTrashed;

    const buldings = await Bulding.find(query).sort({ _id: -1 });

    res.status(200).json({ status: true, buldings });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
export const getBulding = async (req, res) => {
  try {
    const { id } = req.params;

    const bulding = await Bulding.findById(id).populate({
      path: "activities.by",
      select: "name",
    });

    res.status(200).json({
      status: true,
      bulding,
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
export const createSubTask = async (req, res) => {
  try {
    const { title, tag } = req.body;
    const { id } = req.params;

    if (!title) {
      return res.status(400).json({
        status: false,
        message: "برجاء إضافه وصف التعليق",
      });
    }

    const newSubTask = {
      title,
      tag: tag || "",
    };

    const updatedTask = await Bulding.findByIdAndUpdate(
      id,
      {
        $push: {
          subTasks: newSubTask,
        },
      },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({
        status: false,
        message: "العقار غير موجود",
      });
    }

    res.status(201).json({
      status: true,
      message: "تم إضافه التعليق بنجاح",
      bulding: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
export const postBuldingActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const { type, activity } = req.body;

    const bulding = await Bulding.findById(id);

    const data = {
      type,
      activity,
      by: userId,
    };

    bulding.activities.push(data);

    await bulding.save();

    res.status(200).json({ status: true, message: "تمت إضافه التحرك بنجاح" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
export const uploadPriceOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const bulding = await Bulding.findById(id);
    if (!bulding) {
      return res.status(404).json({ status: false, message: "لم يتم العثور على العقار" });
    }

    // التحقق من رفع الملف
    if (!req.file) {
      return res.status(400).json({ status: false, message: "يرجى رفع ملف PDF صالح" });
    }
    if (!Array.isArray(bulding.priceOffer)) {
      bulding.priceOffer = [];
    }
    bulding.priceOffer.push(req.file.path);

    await bulding.save();

    res.status(200).json({
      status: true,
      bulding,
      message: "تم إضافة عرض الأسعار بنجاح",
    });
  } catch (error) {
    console.error("Upload Price Offer Error:", error);
    return res.status(500).json({ status: false, message: "حدث خطأ أثناء رفع الملف" });
  }
};
export const updateBulding = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      documnetNum,
      identityId,
      type,
      size,
      usageType,
      site,
      pieceNumber,
      district,
      city,
      nationalId,
      name,
      owingPercentage,
      phone,
    } = req.body;

      const reqClient = {
        nationalId,
        name,
        owingPercentage,
        phone,
      };

    const bulding = await Bulding.findById(id);

    bulding.documnetNum = documnetNum;
    bulding.identityId = identityId;    
    bulding.type = type;
    bulding.size = size;
    bulding.site = site;
    bulding.pieceNumber = pieceNumber;
    bulding.usageType = usageType;
    bulding.district = district;
    bulding.city = city;
    bulding.nationalId =nationalId ;
    bulding.name =name ;
    bulding.owingPercentage = owingPercentage;
    bulding.client = reqClient;

    await bulding.save();

    res.status(200).json({ status: true, message: "تم التعديل بنجاح" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
export const trashBulding = async (req, res) => {
  try {
    const { id } = req.params;

    const bulding = await Bulding.findById(id);

    bulding.isTrashed = true;

    await bulding.save();

    res.status(200).json({
      status: true,
      message: `تم الحذف`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
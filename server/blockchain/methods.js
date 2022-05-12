import { config } from 'dotenv'
config({ path: '../.env' })
import MainContract from './MainContract.js'
import web3 from './web3.js'
import { getIpfsLink } from './getIpfsLink.js'
import { birthCreate } from '../pdfHelpers/birthCreate.js'
import { aadharCreate } from '../pdfHelpers/aadharCreate.js'
import { passportCreate } from '../pdfHelpers/passportCreate.js'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const uploadDir = path.join(__dirname, '../pdf_file')

const signer = web3.eth.accounts.privateKeyToAccount(
  process.env.SIGNER_PRIVATE_KEY
)
web3.eth.accounts.wallet.add(signer)
const address = signer.address

export const verifyCerti = async (req, res) => {
  try {
    req.body.email = req.user.email
    const { type, email } = req.body
    const file = req.file.buffer
    let storedData
    fs.writeFileSync(path.join(uploadDir, `Input${email}.pdf`), file)
    const link = await getIpfsLink(`Input${email}`)
    let chk = true
    if (type === 'Birth') {
      storedData = await MainContract.methods.getBirthCertificate(email).call()
    } else if (type === 'Aadhar') {
      storedData = await MainContract.methods.getAadharCard(email).call()
    } else {
      storedData = await MainContract.methods
        .getPassportCertificate(email)
        .call()
    }
    if (!storedData || !link || link !== storedData[2]) {
      chk = false
    }
    fs.unlinkSync(path.join(uploadDir, `Input${email}.pdf`))
    return res.send(JSON.stringify(chk))
  } catch (error) {
    return res.send(JSON.stringify(false))
  }
}

export const newBirthCertificate = async (req, res) => {
  try {
    req.body.email = req.user.email
    var data = req.body

    await birthCreate(data)

    const link = await getIpfsLink(`${data.email}_birth`)
    await MainContract.methods
      .newBirthCerti(
        req.body.email,
        req.body.childName,
        req.body.dateOfBirth,
        link,
        ''
      )
      .send({ from: address, gas: '300000' })

    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(JSON.stringify(false))
  }
}

export const setBirthCertificate = async (req, res) => {
  try {
    req.body.email = req.user.email
    var data = req.body
    await birthCreate(data)
    const link = await getIpfsLink(`${data.email}_birth`)
    await MainContract.methods
      .setBirthCertificate(
        req.body.email,
        req.body.childName,
        req.body.dateOfBirth,
        link,
        ''
      )
      .send({ from: address, gas: '300000' })

    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(false)
  }
}

export const approveBirthCertificate = async (req, res) => {
  try {
    await MainContract.methods
      .approveBirthCertificate(req.body.email)
      .send({ from: address, gas: '300000' })

    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(false)
  }
}

export const rejectBirthCertificate = async (req, res) => {
  try {
    await MainContract.methods
      .rejectBirthCertificate(req.body.email)
      .send({ from: address, gas: '300000' })

    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(false)
  }
}
//req.file.buffer ma file avse
// req.body.type

export const getTopBirthCertificate = async (req, res) => {
  try {
    const data = await MainContract.methods.topBirthCertificate().call()

    return res.send(JSON.stringify(data))
  } catch (error) {
    return res.send(error.message)
  }
}

export const getBirthCertificate = async (req, res) => {
  try {
    req.body.email = req.user.email
    const data = await MainContract.methods
      .getBirthCertificate(req.body.email)
      .call()

    return res.send(JSON.stringify(data))
  } catch (error) {
    return res.send(error.message)
  }
}

export const getCountPendingBirthCertificate = async (req, res) => {
  try {
    const data = await MainContract.methods
      .getCountPendingBirthCertificate()
      .call()

    return res.send(JSON.stringify(data))
  } catch (error) {
    return res.send(error.message)
  }
}

export const getAllPendingBirthCertificates = async (req, res) => {
  try {
    const data = await MainContract.methods
      .getAllPendingBirthCertificates()
      .call()

    return res.send(JSON.stringify(data))
  } catch (error) {
    return res.send(JSON.stringify([]))
  }
}

export const newAadharCard = async (req, res) => {
  try {
    req.body.email = req.user.email
    var data = req.body
    await aadharCreate(data)
    const link = await getIpfsLink(`${data.email}_aadhar`)
    await MainContract.methods
      .newAadharCard(
        req.body.email,
        req.body.applicantName,
        req.body.contactNo,
        link,
        ''
      )
      .send({ from: address, gas: '300000' })

    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(false)
  }
}

export const setAadharCard = async (req, res) => {
  try {
    req.body.email = req.user.email
    var data = req.body
    await aadharCreate(data)
    const link = await getIpfsLink(`${data.email}_aadhar`)
    await MainContract.methods
      .setAadharCard(
        req.body.email,
        req.body.applicantName,
        req.body.contactNo,
        link,
        ''
      )
      .send({ from: address, gas: '300000' })

    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(false)
  }
}

export const approveAadharCard = async (req, res) => {
  try {
    await MainContract.methods
      .approveAadharCard(req.body.email)
      .send({ from: address, gas: '300000' })

    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(false)
  }
}

export const getTopAadharCerti = async (req, res) => {
  try {
    const data = await MainContract.methods.topAadharCerti().call()

    return res.send(JSON.stringify(data))
  } catch (error) {
    return res.send(error.message)
  }
}

export const rejectAadharCard = async (req, res) => {
  try {
    await MainContract.methods
      .rejectAadharCard(req.body.email)
      .send({ from: address, gas: '300000' })

    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(false)
  }
}

export const getAadharCard = async (req, res) => {
  try {
    req.body.email = req.user.email
    const data = await MainContract.methods.getAadharCard(req.body.email).call()

    return res.send(JSON.stringify(data))
  } catch (error) {
    return res.send(error.message)
  }
}

export const getCountPendingAadharCard = async (req, res) => {
  try {
    const data = await MainContract.methods.getCountPendingAadharCard().call()

    return res.send(JSON.stringify(data))
  } catch (error) {
    return res.send(error.message)
  }
}

export const getAllPendingAadharCards = async (req, res) => {
  try {
    const data = await MainContract.methods.getAllPendingAadharCards().call()

    return res.send(JSON.stringify(data))
  } catch (error) {
    return res.send(JSON.stringify([]))
  }
}

export const shareCerti = async (req, res) => {
  try {
    req.body.email = req.user.email
    await MainContract.methods
      .shareCertificate(
        req.body.email,
        req.body.toShareEmail,
        req.body.type,
        req.body.timeperiod,
        String(Date.now())
      )
      .send({ from: address, gas: '300000' })

    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(false)
  }
}

export const getSharedCertis = async (req, res) => {
  try {
    req.body.accName = req.user.email
    const data = await MainContract.methods
      .getSharedCertis(req.body.accName)
      .call()

    let modified_data = []
    const update = async (certi) => {
      let new_certi = []

      for (let i = 0; i < 4; i++) {
        new_certi.push(certi[i])
      }

      if (certi[0] === '1') {
        const birthData = await MainContract.methods
          .getBirthCertificate(certi[3])
          .call()

        new_certi.push(birthData[2])
      } else if (certi[1] === '2') {
        const aadharData = await MainContract.methods
          .getAadharCard(certi[3])
          .call()
        new_certi.push(aadharData[2])
      } else {
        const passportData = await MainContract.methods
          .getPassportCertificate(certi[3])
          .call()
        new_certi.push(passportData[2])
      }

      modified_data.push(new_certi)
    }

    for (let certi of data) {
      await update(certi)
    }

    return res.send(JSON.stringify(modified_data))
  } catch (error) {
    return res.send(error.message)
  }
}

export const newPassportCertificate = async (req, res) => {
  try {
    req.body.email = req.user.email
    var data = req.body
    await passportCreate(data)
    const link = await getIpfsLink(`${data.email}_passport`)
    await MainContract.methods
      .newPassportCertificate(
        req.body.email,
        req.body.applicantName,
        req.body.dateOfBirth,
        link,
        ''
      )
      .send({ from: address, gas: '300000' })

    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(false)
  }
}

export const setPassportCertificate = async (req, res) => {
  try {
    req.body.email = req.user.email
    var data = req.body
    await passportCreate(data)
    const link = await getIpfsLink(`${data.email}_passport`)
    await MainContract.methods
      .setPassportCertificate(
        req.body.email,
        req.body.applicantName,
        req.body.dateOfBirth,
        link,
        ''
      )
      .send({ from: address, gas: '300000' })

    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(false)
  }
}

export const approvePassportCertificate = async (req, res) => {
  try {
    await MainContract.methods
      .approvePassportCertificate(req.body.email)
      .send({ from: address, gas: '300000' })

    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(false)
  }
}

export const getTopPassportCertificate = async (req, res) => {
  try {
    const data = await MainContract.methods.topPassportCertificate().call()

    return res.send(JSON.stringify(data))
  } catch (error) {
    return res.send(error.message)
  }
}

export const rejectPassportCertificate = async (req, res) => {
  try {
    await MainContract.methods
      .rejectPassportCertificate(req.body.email)
      .send({ from: address, gas: '300000' })

    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(false)
  }
}

export const getPassportCertificate = async (req, res) => {
  try {
    req.body.email = req.user.email
    const data = await MainContract.methods
      .getPassportCertificate(req.body.email)
      .call()

    return res.send(JSON.stringify(data))
  } catch (error) {
    return res.send(error.message)
  }
}

export const getCountPendingPassportCertificate = async (req, res) => {
  try {
    const data = await MainContract.methods
      .getCountPendingPassportCertificate()
      .call()

    return res.send(JSON.stringify(data))
  } catch (error) {
    return res.send(error.message)
  }
}

export const getAllPendingPassportCertificates = async (req, res) => {
  try {
    const data = await MainContract.methods.getAllPendingPassportCertis().call()

    return res.send(JSON.stringify(data))
  } catch (error) {
    return res.send(JSON.stringify([]))
  }
}

export const getOwner = async (req, res) => {
  try {
    const data = await MainContract.methods.owner().call()
    // ;
    res.send(JSON.stringify(data))
  } catch (error) {
    // res.send(error.message);
  }
}

export const getUserByEmail = async (email) => {
  const user = await MainContract.methods.getUser(email).call()
  return user
}

export const getUser = async (req, res) => {
  try {
    const data = await MainContract.methods.getUser(req.body.accName).call()
    // ;
    return res.send(JSON.stringify(data))
  } catch (error) {
    res.send(error.message)
  }
}

export const getApprovers = async (req, res) => {
  try {
    const data = await MainContract.methods.getApprovers().call()
    // ;
    return res.send(JSON.stringify(data))
  } catch (error) {
    res.send(error.message)
  }
}

export const getAdmins = async (req, res) => {
  try {
    const data = await MainContract.methods.getAdmins().call()
    // ;
    return res.send(JSON.stringify(data))
  } catch (error) {
    res.send(error.message)
  }
}

export const getId = async (req, res) => {
  try {
    const data = await MainContract.methods.getId(req.body.accName).call()
    // ;
    return res.send(JSON.stringify(data))
  } catch (error) {
    res.send(error.message)
  }
}

export const isAdmin = async (req, res) => {
  try {
    const data = await MainContract.methods.isAdmin(req.body.accName).call()
    // ;
    return res.send(JSON.stringify(data))
  } catch (error) {
    res.send(error.message)
  }
}

export const isApprover = async (req, res) => {
  try {
    req.body.accName = req.user.email
    const data = await MainContract.methods.isApprover(req.body.accName).call()
    return res.send(JSON.stringify(data))
  } catch (error) {
    res.send(error.message)
  }
}

export const isApplicant = async (req, res) => {
  try {
    req.body.accName = req.user.email
    let data = await MainContract.methods.getUser(req.body.accName).call()
    if (data[3] === 1) data = true
    else data = false
    return res.send(JSON.stringify(data))
  } catch (error) {
    res.send(error.message)
  }
}

export const login = async (req, res) => {
  try {
    const data = await MainContract.methods
      .login(req.body.accName, req.body.password)
      .call()
    return res.send(JSON.stringify(data))
  } catch (error) {
    res.send(error.message)
  }
}

export const signupUser = async (accName, name, password) => {
  try {
    await MainContract.methods
      .registerApplicant(accName, name, password)
      .send({ from: address, gas: '300000' })
    //
    return true
  } catch (error) {
    return false
  }
}

export const registerApplicant = async (req, res) => {
  try {
    await MainContract.methods
      .registerApplicant(req.body.email, req.body.name, req.body.password)
      .send({ from: address, gas: '300000' })
    //
    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(false)
  }
}

export const registerApprover = async (req, res) => {
  try {
    await MainContract.methods
      .registerApplicant(
        req.body.accNameAdmin,
        req.body.passwordAdmin,
        req.body.accName,
        req.body.name,
        req.body.password
      )
      .send({ from: address, gas: '300000' })

    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(false)
  }
}

export const registerAdmin = async (req, res) => {
  try {
    await MainContract.methods
      .registerAdmin(req.body.accName, req.body.name, req.body.password)
      .send({ from: address, gas: '300000' })

    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(false)
  }
}

export const changePassword = async (req, res) => {
  try {
    await MainContract.methods
      .changePassword(req.body.accName, req.body.password, req.body.newPassword)
      .send({ from: address, gas: '300000' })

    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(false)
  }
}

export const addNotification = async (req, res) => {
  try {
    await MainContract.methods
      .addNotification(
        req.body.accName,
        req.body.message,
        req.body.redirectLink
      )
      .send({ from: address, gas: '300000' })

    return res.send(JSON.stringify(true))
  } catch (error) {
    return res.send(false)
  }
}

export const getUserNotifications = async (req, res) => {
  try {
    const data = await MainContract.methods
      .getUserNotifications(req.body.accountName)
      .call()

    return res.send(JSON.stringify(data))
  } catch (error) {
    return res.send(error.message)
  }
}

/*
export const newCertificate = async (acc, hash, desc) => {
    try {

        await MainContract.methods
            .newCertificate(acc, hash, desc)
            .send({ from: address, gas: "300000" });

        const id = await MainContract.methods
            .lastID()
            .call();

        return JSON.stringify(id);
    } catch (error) {
        ;
        return res.send(error.message);
    }
}

export const getCertificate = async (id) => {
    try {

        const data = await MainContract.methods
            .getCertificate(id)
            .call();

        return res.send(JSON.stringify(data));

    } catch (error) {
        ;
        return res.send(error.message);
    }
}

export const setCertificate = async (id, acc, hash, desc) => {
    try {

        await MainContract.methods
            .setCertificate(id, acc, hash, desc)
            .send({ from: address, gas: "300000" });

        return JSON.stringify('Success');
    } catch (error) {
        ;
        return res.send(error.message);
    }
}

export const setActive = async (id, state) => {
    try {
        await MainContract.methods
            .setActive(id, state)
            .send({ from: address, gas: "300000" });
        return JSON.stringify('Success');
    } catch (error) {
        ;
        return res.send(error.message);
    }
}
*/

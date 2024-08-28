import { RequiredEntityData } from "@mikro-orm/postgresql";
import { HouseholdMemberTypes } from "../../settings/entities/household-member-type.entity";
import { HOUSEHOLD_MEMBER_TYPE, HouseholdMemberInfo, ReferenceInfo } from "../dto/create-application.dto";
import { AdoptApplications } from "../entities/applications/adopt-applications.entity";
import { FosterApplications } from "../entities/applications/foster-applications.entity";
import { AdoptApplicationsRepository } from "../repositories/applications/adopt-applications.repository";
import { FosterApplicationsRepository } from "../repositories/applications/foster-applications.repository";
import { HouseholdInfoRepository } from "../repositories/applications/household-info.repository";
import { ReferenceInfoRepository } from "../repositories/applications/reference-info.repository";

interface FormBuilder {
    setForm: (
        essentialInfro: 
            RequiredEntityData<AdoptApplications, never, false>
            | RequiredEntityData<FosterApplications, never, false>
    ) => void;
    setReferenceInfo: (referenceInfo: ReferenceInfo[]) => void;
    setHouseholdInfo: (type: HouseholdMemberTypes , info: number[] | HouseholdMemberInfo[]) => void
}

export class AdoptionFormBuilder implements FormBuilder  {
    private adoptionForm: AdoptApplications;
    private repository: AdoptApplicationsRepository;
    private referenceInfoRepository: ReferenceInfoRepository;
    private householdInfoRepository: HouseholdInfoRepository;

    constructor(
        repository: AdoptApplicationsRepository,
        referenceInfoRepository: ReferenceInfoRepository,
        householdInfoRepository: HouseholdInfoRepository,
    ) {
        this.repository = repository;
        this.referenceInfoRepository = referenceInfoRepository;
        this.householdInfoRepository = householdInfoRepository;
    }

    setForm = (essentialInfro: RequiredEntityData<AdoptApplications, never, false>) => {
        this.adoptionForm = this.repository.create(essentialInfro);
    }

    setReferenceInfo = (referenceInfo: ReferenceInfo[]) => {
        referenceInfo.forEach(({ name, phoneNumber }) => {
            this.adoptionForm.referenceInfo.add(this.referenceInfoRepository.create({
              name,
              phoneNumber,
              fosterApplication: null,
              adoptApplication: this.adoptionForm,
              createdBy: this.adoptionForm.email,
              updatedBy: this.adoptionForm.email,
            }))
        })
    }

    setHouseholdInfo = (householdMemberTypes: HouseholdMemberTypes , info: number[] | HouseholdMemberInfo[]) => {
        if(householdMemberTypes.value === HOUSEHOLD_MEMBER_TYPE.ADULT) {
            (info as HouseholdMemberInfo[]).forEach(({ name, age, occupation }) => {
                this.adoptionForm.householdInfo.add(this.householdInfoRepository.create({
                  name,
                  age,
                  occupation,
                  householdMemberType: householdMemberTypes,
                  fosterApplication: null,
                  adoptApplication: this.adoptionForm,
                  createdBy: this.adoptionForm.email,
                  updatedBy: this.adoptionForm.email,
                }))
            })
        } else {
            (info as number[]).forEach((age) => {
                this.adoptionForm.householdInfo.add(this.householdInfoRepository.create({
                  name: null,
                  age,
                  occupation: null,
                  householdMemberType: householdMemberTypes,
                  fosterApplication: null,
                  adoptApplication: this.adoptionForm,
                  createdBy: this.adoptionForm.email,
                  updatedBy: this.adoptionForm.email,
                }))
            })
        }
    }

    getForm = () => this.adoptionForm;
}

export class FosterFormBuilder implements FormBuilder {
    private fosteringForm: FosterApplications;
    private repository: FosterApplicationsRepository;
    private referenceInfoRepository: ReferenceInfoRepository;
    private householdInfoRepository: HouseholdInfoRepository;
    
    constructor(
        repository: FosterApplicationsRepository,
        referenceInfoRepository: ReferenceInfoRepository,
        householdInfoRepository: HouseholdInfoRepository,
    ) {
        this.repository = repository;
        this.referenceInfoRepository = referenceInfoRepository;
        this.householdInfoRepository = householdInfoRepository;
    }

    setForm = (essentialInfro: RequiredEntityData<FosterApplications, never, false>) => {
        this.fosteringForm = this.repository.create(essentialInfro);
    }

    setReferenceInfo = (referenceInfo: ReferenceInfo[]) => {
        referenceInfo.forEach(({ name, phoneNumber }) => {
            this.fosteringForm.referenceInfo.add(this.referenceInfoRepository.create({
              name,
              phoneNumber,
              fosterApplication: this.fosteringForm,
              adoptApplication: null,
              createdBy: this.fosteringForm.email,
              updatedBy: this.fosteringForm.email,
            }))
        })
    }

    setHouseholdInfo = (householdMemberTypes: HouseholdMemberTypes , info: number[] | HouseholdMemberInfo[]) => {
        if(householdMemberTypes.value === HOUSEHOLD_MEMBER_TYPE.ADULT) {
            (info as HouseholdMemberInfo[]).forEach(({ name, age, occupation }) => {
                this.fosteringForm.householdInfo.add(this.householdInfoRepository.create({
                  name,
                  age,
                  occupation,
                  householdMemberType: householdMemberTypes,
                  fosterApplication: this.fosteringForm,
                  adoptApplication: null,
                  createdBy: this.fosteringForm.email,
                  updatedBy: this.fosteringForm.email,
                }))
            })
        } else {
            (info as number[]).forEach((age) => {
                this.fosteringForm.householdInfo.add(this.householdInfoRepository.create({
                  name: null,
                  age,
                  occupation: null,
                  householdMemberType: householdMemberTypes,
                  fosterApplication: this.fosteringForm,
                  adoptApplication: null,
                  createdBy: this.fosteringForm.email,
                  updatedBy: this.fosteringForm.email,
                }))
            })
        }
    }

    getForm = () => this.fosteringForm;
}